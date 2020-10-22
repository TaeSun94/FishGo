from django.shortcuts import render
from .models import Fish, User_Fish
from accounts.models import User
from rest_framework.decorators import action, permission_classes
from rest_framework.response import Response
from .serializers import FishSerializer, UserFishSerializer, UserSerializer
from rest_framework import filters
from rest_framework.exceptions import NotAuthenticated, NotFound, ValidationError
from rest_framework.pagination import PageNumberPagination
from rest_framework.views import APIView
from django.http import Http404
from rest_framework import generics


# Create your views here.
#이메일 인증 기능
# class EmaiActivate(View):
#     def get(self, request, uidb64, token):
#         try:
#             uid = force_text(urlsafe_base64_decode(uidb64))
#             user = Users.objects.get(pk=uid)
#             user_dic = jwt.decode(token,SECRET_KEY,algorithm='HS256')
#             if user.id == user_dic["user"]:
#                 user.is_active = True
#                 user.save()
#                 return redirect("http://127.0.0.1/rest-auth/signin")

#             return JsonResponse({'message':'auth fail'}, status=400)
#         except ValidationError:
#             return JsonResponse({'message':'type_error'}, status=400)
#         except KeyError:
#             return JsonResponse({'message':'INVALID_KEY'}, status=400)


class SmallPagination(PageNumberPagination):
    page_size = 10
    page_size_query_param = "page_size"
    max_page_size = 50


class FishListAPIView(APIView):
    def get(self, request):
        keyword = self.request.query_params.get('keyword', None)

        if keyword:
            serializer = FishSerializer(Fish.objects.filter(name__contains=keyword), many=True)
        else:
            serializer = FishSerializer(Fish.objects.all(), many=True)

        result = {
            "status": 200,
            "message": "OK",
            "data": { "fishes" : serializer.data },
        }
        return Response(result, status=200)

    def post(self, request):
        serializer = FishSerializer(data=request.data)
        if serializer.is_valid():
            if serializer.is_valid():
                serializer.save()
                result = {
                    "status": 201,
                    "message": "Created",
                    "data": { "fish" : serializer.data },
                }
                return Response(result, status=201)


# 유저가 잡은 물고기인지 확인하는 부분 추가 필요?
class FishDetailAPIView(APIView):
    def get_object(self, pk):
        try:
            return Fish.objects.get(pk=pk)
        except Fish.DoesNotExist:
            raise Http404


    def get(self, request, pk):
        fish = self.get_object(pk)
        serializer = FishSerializer(fish)
        result = {
            "status": 200,
            "message": "OK",
            "data": { "fish" : serializer.data },
        }
        return Response(result, status=200)




