from rest_framework import generics

from . import models
from . import serializers

import jwt
import json

from .models import User
from .token import account_activation_token
from .email_text import message
from django.contrib import auth
from django.contrib.auth.views import LoginView, LogoutView, PasswordResetView, PasswordResetDoneView, PasswordResetConfirmView, PasswordResetCompleteView

# from .settings import SEC
from my_settings import EMAIL, SECRET_KEY
from django.views import View
from django.http import HttpResponse, JsonResponse
from django.core.exceptions import ValidationError
from django.core.validators import validate_email
from django.shortcuts import redirect, render
from django.contrib.sites.shortcuts import get_current_site
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from django.core.mail import EmailMessage
from django.utils.encoding import force_bytes, force_text

from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator


import requests
import json
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework.exceptions import ValidationError
from rest_framework.authtoken.models import Token
from django.contrib.auth.models import update_last_login
from .serializers import CreateUserSerializer, LoginUserSerializer, UserSerializer
from rest_framework import viewsets, permissions, status
from rest_framework.views import APIView
from django.http import Http404
from django.shortcuts import get_object_or_404


# 이메일 인증부
class Activate(View):
    def get(self, request, uidb64, token):
        try:
            uid = force_text(urlsafe_base64_decode(uidb64))
            user = User.objects.get(pk=uid)

            if account_activation_token.check_token(user, token):
                user.is_active = True
                user.save()
                return render(request, 'accounts/auth.html')

            return Response({"message": "AUTH_FAIL"}, status=400)

        except ValidationError:
            return Response({"message": "TYPE_ERROR"}, status=400)
        except KeyError:
            return Response({"message": "INVALID_KEY"}, status=400)


# 회원가입
@method_decorator(csrf_exempt, name='dispatch')
class RegistrationAPI(generics.GenericAPIView):
    serializer_class = CreateUserSerializer

    def post(self, request, *args, **kwargs):
        if len(request.data["username"]) < 8 or len(request.data["password"]) < 8:
            body = {
                "status": 422,
                "message": "Unprocessable Entity",
            }
            return Response(body, status=422)
        

        # 아이디 중복이라면
        if User.objects.filter(username=request.data["username"].lower()).exists():
            return Response(
                {
                    "status": 400,
                    "message": "Bad Request"
                }, 
                
                status=400
                )
        
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        
        crrunt_site = get_current_site(request)
        domain = crrunt_site.domain
        uidb64 = urlsafe_base64_encode(force_bytes(user.pk))
        token = account_activation_token.make_token(user)
        message_data = message(domain, uidb64, token)

        mail_title = "피쉬고에 오신 여러분 반갑습니다!! 이메일 인증을 완료해주세요!!"
        mail_to = request.data["username"]
        email = EmailMessage(mail_title, message_data, to=[mail_to])
        email.send()

        return Response(
            {
                "status": 200,
                "message": "OK",
                "data": {
                    "user": UserSerializer(
                        user, context=self.get_serializer_context()
                    ).data,
                }
            },
            status=200
        )


# 로그인
class LoginAPI(generics.GenericAPIView):
    serializer_class = LoginUserSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        try:
            serializer.is_valid(raise_exception=True)
        except:
            return Response(
                {
                    "status": 404,
                    "message": "Not Found",
                },
                status=404
            )

        user = serializer.validated_data
        token, created = Token.objects.get_or_create(user=user)
        return Response(
            {
                "status": 200,
                "message": "OK",
                "data": {
                    "token": str(token),
                    "user": UserSerializer(
                        user, context=self.get_serializer_context()
                    ).data,
                }
            },
            status=200
        )

# 로그아웃
class LogoutAPIView(APIView):
    def post(self, request, format=None):
        if request.user.is_anonymous:
            return Response(
                {
                    "status": 401,
                    "message": "Unauthorized",
                },
                status=401
            )

        request.user.auth_token.delete()
        return Response(
            {
                "status": 200,
                "message": "OK",
            },
            status=200
        )


# 카카오 로그인
@api_view(['POST'])
def get_token(request):
    access_token = request.data.get('access_token', None)

    # 유저정보 갖고오기
    url = 'https://kapi.kakao.com/v2/user/me'

    headers = {
        'Authorization': f'Bearer {access_token}',
        'Content-type': 'application/x-www-form-urlencoded; charset=utf-8'
    }

    kakao_response = requests.get(url, headers = headers)
    kakao_response = json.loads(kakao_response.text)
    account = kakao_response['kakao_account']
    
    try:
        user_email = account['email']

    except: 
        result = {
            "status": 400,
            "message": "Bad Request",
        }
        return Response(result, status=400)


    # 유저정보 저장 혹은 토큰 발행(배포전 수정 필요)
    if User.objects.filter(user_type='kakao', username=user_email).exists():
        user_now = User.objects.get(user_type='kakao', username=user_email) 
        token, created = Token.objects.get_or_create(user=user_now)
        update_last_login(None, user_now)
        
    else:
        try:
            User(user_type='kakao', username=user_email, email=user_email).save()
            user_now = User.objects.get(user_type='kakao', username=user_email) 
            token = Token.objects.create(user=user_now)
            update_last_login(None, user_now)
        except:
            result = {
                "status": 400,
                "message": "Bad Request",
            }
            return Response(result, status=400)            
        
    # return Response({'key': token.key}) 
    return Response(
        {
            "status": 200,
            "message": "OK",
            "data": {
                "token": str(token.key),
                "user": UserSerializer(
                    user_now
                ).data,
            }
        },
        status=200
    )

# 아이디 중복확인
@api_view(['POST'])
def check_username(request):
    temp_name = request.data.get('temp_name', None)
    check = True
    if User.objects.filter(username=temp_name):
        check = True
    else:
        check = False

    return Response(
        {
            "status": 200,
            "message": "OK",
            "check": check
        },
        status=200
    )


@api_view(['DELETE'])
def delete_user(request):
    try: 
        username = request.data.get('username', None)
        user = get_object_or_404(User, username=username)
        user.delete()
        result = {
            "status": 200,
            "message": "OK",
        }
        return Response(result, status=200) 

    except Http404:
        result = {
            "status": 404,
            "message": "Not Found",
        }
        return Response(result, status=404)         


# 비밀번호 변경 
class UserPasswordResetConfirmView(PasswordResetConfirmView):
    template_name = 'accounts/password_reset_confirm.html'


# 비밀번호 변경 후
class UserPasswordResetCompleteView(PasswordResetCompleteView):
    template_name = 'accounts/password_reset_complete.html'



    # @method_decorator(csrf_exempt, name='dispatch')
# class SignUpView(View):
#     def post(self, request):

#         # json 형태로  read
#         data = json.loads(request.body)
#         try:
#             validate_email(data["username"])
            
#             # 아이디 중복이라면
#             if User.objects.filter(username=data["username"]).exists():
#                 return JsonResponse({"message": "EXISTS_EMAIL"}, status=400)
            
#             user = User.objects.create(
#                 username = data["username"],
#                 is_active = False
#             )
#             user.set_password(data["password"])
#             user.save()

#             crrunt_site = get_current_site(request)
#             domain = crrunt_site.domain
#             uidb64 = urlsafe_base64_encode(force_bytes(user.pk))
#             token = account_activation_token.make_token(user)
#             message_data = message(domain, uidb64, token)

#             mail_title = "피쉬고에 오신 여러분 반갑습니다!! 이메일 인증을 완료해주세요!!"
#             mail_to = data['username']
#             email = EmailMessage(mail_title, message_data, to=[mail_to])
#             email.send()

#             return JsonResponse({"message": "OK"}, status=200)

#         except KeyError:
#             return JsonResponse({"message": "KEY_ERROR"}, status=400)


# @method_decorator(csrf_exempt, name='dispatch')
# class LoginView(View):
#     def login(request):
#         if request.method == 'POST':
#             username = request.POST['username']
#             password = request.POST['password']

#             user = auth.authenticate(request, username=username, password=password)

#             if user is not None:
#                 auth.login(request, user)
#                 return JsonResponse({"message": "Login OK"}, status=200)
#             else:
#                 return JsonResponse({"message": "user is None"}, status=404)



# # 일반 회원가입
# class RegistrationAPI(generics.GenericAPIView):
#     serializer_class = CreateUserSerializer

#     def post(self, request, *args, **kwargs):
#         if len(request.data["username"]) < 6 or len(request.data["password"]) < 4:
#             body = {
#                 "status": 422,
#                 "message": "short field",
#                 "data": {}
#             }
#             return Response(body, status=422)
#         serializer = self.get_serializer(data=request.data)
#         serializer.is_valid(raise_exception=True)
#         user = serializer.save()
#         token = str(Token.objects.create(user=user))
#         return Response(
#             {
#                 "status": 201,
#                 "message": "",
#                 "data": {
#                     "token": token,
#                     "user": UserSerializer(
#                         user, context=self.get_serializer_context()
#                     ).data,
#                 }
#             },
#             status=201
#         )