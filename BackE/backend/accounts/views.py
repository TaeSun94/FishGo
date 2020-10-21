from rest_framework import generics

from . import models
from . import serializers


import jwt
import json
import bcrypt

from .models import User
from .token import account_activation_token
from .email_text import message
from django.contrib import auth


# from .settings import SEC
from my_settings import EMAIL, SECRET_KEY
from django.views import View
from django.http import HttpResponse, JsonResponse
from django.core.exceptions import ValidationError
from django.core.validators import validate_email
from django.shortcuts import redirect
from django.contrib.sites.shortcuts import get_current_site
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from django.core.mail import EmailMessage
from django.utils.encoding import force_bytes, force_text


from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator


class UserListView(generics.ListAPIView):
    queryset = models.User.objects.all()
    serializer_class = serializers.UserSerializer

@method_decorator(csrf_exempt, name='dispatch')
class SignUpView(View):
    def post(self, request):

        # json 형태로  read
        data = json.loads(request.body)
        try:
            validate_email(data["username"])
            
            # 아이디 중복이라면
            if User.objects.filter(username=data["username"]).exists():
                return JsonResponse({"message": "EXISTS_EMAIL"}, status=400)
            
            user = User.objects.create(
                username = data["username"],
                is_active = False
            )
            user.set_password(data["password"])
            user.save()

            crrunt_site = get_current_site(request)
            domain = crrunt_site.domain
            uidb64 = urlsafe_base64_encode(force_bytes(user.pk))
            token = account_activation_token.make_token(user)
            message_data = message(domain, uidb64, token)

            mail_title = "피쉬고에 오신 여러분 반갑습니다!! 이메일 인증을 완료해주세요!!"
            mail_to = data['username']
            email = EmailMessage(mail_title, message_data, to=[mail_to])
            email.send()

            return JsonResponse({"message": "OK"}, status=200)

        except KeyError:
            return JsonResponse({"message": "KEY_ERROR"}, status=400)


@method_decorator(csrf_exempt, name='dispatch')
class LoginView(View):
    def login(request):
        if request.method == 'POST':
            username = request.POST['username']
            password = request.POST['password']

            user = auth.authenticate(request, username=username, password=password)

            if user is not None:
                auth.login(request, user)
                return JsonResponse({"message": "Login OK"}, status=200)
            else:
                return JsonResponse({"message": "user is None"}, status=404)

# 이메일 인증부
class Activate(View):
    def get(self, request, uidb64, token):
        try:
            uid = force_text(urlsafe_base64_decode(uidb64))
            user = User.objects.get(pk=uid)

            if account_activation_token.check_token(user, token):
                user.is_active = True
                user.save()

                return redirect(EMAIL['REDIRECT_PAGE'])

            return JsonResponse({"message": "AUTH_FAIL"}, status=400)

        except ValidationError:
            return JsonResponse({"message": "TYPE_ERROR"}, status=400)
        except KeyError:
            return JsonResponse({"message": "INVALID_KEY"}, status=400)