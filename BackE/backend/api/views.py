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
from rest_framework import viewsets
from django.shortcuts import get_object_or_404


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
            serializer.save()
            result = {
                "status": 201,
                "message": "Created",
                "data": { "fish" : serializer.data },
            }
            return Response(result, status=201)


class FishDetailAPIView(APIView):
    def get_object(self, pk):
        try:
            return Fish.objects.get(pk=pk)
        except Fish.DoesNotExist:
            raise NotFound()


    def get(self, request, pk):
        if request.user.is_anonymous:
            result = {
                "status": 401,
                "message": "Unauthorized",
            }
            return Response(result, status=401) 
        else:
            try:
                fish = self.get_object(pk)
                catched = User_Fish.objects.filter(user_id=request.user.id)

                fish_list = []
                for record in catched:
                    if record.fish_id not in fish_list:
                        fish_list.append(record.fish_id)

                # 로그인 한 유저가 해당 물고기 잡은 적 있는지
                record = ""
                if fish.id in fish_list:
                    record = "yes"
                else:
                    record = "no"

                serializer = FishSerializer(fish)
                result = {
                    "status": 200,
                    "message": "OK",
                    "data": { "fish" : serializer.data, "record": record },
                }
                return Response(result, status=200)
            except NotFound:
                result = {
                    "status": 404,
                    "message": "Not Found",
                }
                return Response(result, status=404)


class UserViewSet(viewsets.ModelViewSet):
    serializer_class = UserSerializer
    queryset = User.objects.all()

    def list(self, request):
        queryset = User.objects.all()
        serializer = UserSerializer(queryset, many=True)
        result = {
            "status": 200,
            "message": "OK",
            "data": { "users" : serializer.data },
        }
        return Response(result, status=200)

    def retrieve(self, request, pk=None):
        queryset = User.objects.all()
        try:
            user = get_object_or_404(queryset, pk=pk)
            serializer = UserSerializer(user)
            result = {
                "status": 200,
                "message": "OK",
                "data": { "user" : serializer.data },
            }
            return Response(result, status=200)
        except:
            result = {
                "status": 404,
                "message": "Not Found",
            }
            return Response(result, status=404)

# 물고기별 낚시리스트
class UserFishListAPIView(APIView):
    def get_user(self, request):
        if request.user.is_anonymous:
            raise NotAuthenticated()
        else:
            user = request.user
            return user
            
    def get(self, request, pk):
        try:
            user = self.get_user(request) 
            fish = get_object_or_404(Fish, pk=pk)
            catched = User_Fish.objects.filter(user_id=user.id, fish_id=fish.id)
            serializer = UserFishSerializer(catched, many=True)
            if serializer.data:                
                result = {
                    "status": 200,
                    "message": "OK",
                    "data": { "fishes" : serializer.data },
                }
                return Response(result, status=200)    

            else:
                result = {
                    "status": 200,
                    "message": "No Record",
                }
                return Response(result)   

        except NotAuthenticated:
            result = {
                "status": 401,
                "message": "Unauthorized",
            }
            return Response(result, status=401) 
        except Http404:
            result = {
                "status": 404,
                "message": "Not Found",
            }
            return Response(result, status=404) 

# 낚시하기(CRUD)
class UserFishAPIView(APIView):
    def get_user(self, request):
        if request.user.is_anonymous:
            raise NotAuthenticated()
        else:
            user = request.user
            return user
    
    def get(self, request, pk):
        try:
            user = self.get_user(request)
            fish = get_object_or_404(User_Fish, pk=request.data.get('user_fish_id'), user_id=user.id)
            serializer = UserFishSerializer(fish)
            result = {
                "status": 200,
                "message": "OK",
                "data": { "fish" : serializer.data },
            }
            return Response(result, status=200)   

        except NotAuthenticated:
            result = {
                "status": 401,
                "message": "Unauthorized",
            }
            return Response(result, status=401) 
        except Http404:
            result = {
                "status": 404,
                "message": "Not Found",
            }
            return Response(result, status=404)        


    def post(self, request, pk):
        try:
            user = self.get_user(request)   
            fish = get_object_or_404(Fish, pk=pk)

            # 진짜 값으로 수정 필요
            user_fishing = User_Fish(user=user, fish=fish, lat=128, lng=36, length=10)
            user_fishing.save()
            serializer = UserFishSerializer(user_fishing)
            result = {
                "status": 201,
                "message": "Created",
                "data": { "user_fish" : serializer.data },
            }
            return Response(result, status=201) 

            serializer = UserFishSerializer(data=request.data)
            if serializer.is_valid():
                if serializer.is_valid():
                    serializer.save()
                    result = {
                        "status": 201,
                        "message": "Created",
                        "data": { "fish" : serializer.data },
                    }
                    return Response(result, status=201)

        except NotAuthenticated:
            result = {
                "status": 401,
                "message": "Unauthorized",
            }
            return Response(result, status=401) 
        except Http404:
            result = {
                "status": 404,
                "message": "Not Found",
            }
            return Response(result, status=404) 

    # length만 수정 가능?
    def put(self, request, pk):
        try:
            user = self.get_user(request)
            fish = get_object_or_404(User_Fish, pk=request.data.get('user_fish_id'), user_id=user.id)
            
            fish.length = float(request.data.get('length'))
            fish.save()
            serializer = UserFishSerializer(fish)
            result = {
                "status": 200,
                "message": "OK",
                "data": { "fish" : serializer.data },
            }
            return Response(result, status=200)   

            serializer = UserFishSerializer(data=request.data)
            if serializer.is_valid():
                if serializer.is_valid():
                    serializer.save()
                    result = {
                        "status": 201,
                        "message": "Created",
                        "data": { "fish" : serializer.data },
                    }
                    return Response(result, status=201)

        except NotAuthenticated:
            result = {
                "status": 401,
                "message": "Unauthorized",
            }
            return Response(result, status=401) 
        except Http404:
            result = {
                "status": 404,
                "message": "Not Found",
            }
            return Response(result, status=404) 


    def delete(self, request, pk):    
        try:
            user = self.get_user(request)
            fish = get_object_or_404(User_Fish, pk=request.data.get('user_fish_id'), user_id=user.id)
            fish.delete()
            result = {
                "status": 200,
                "message": "OK",
            }
            return Response(result, status=200) 

        except NotAuthenticated:
            result = {
                "status": 401,
                "message": "Unauthorized",
            }
            return Response(result, status=401) 
        except Http404:
            result = {
                "status": 404,
                "message": "Not Found",
            }
            return Response(result, status=404) 


# 유저가 낚시한 물고기 번호만(낚시 히스토리 아이콘 색칠 용)
class UserFishHistory(APIView):
    def get(self, request, pk):
        # if request.user.is_anonymous:
        #     result = {
        #         "status": 401,
        #         "message": "Unauthorized",
        #     }
        #     return Response(result, status=401) 
        # else:
        user = User.objects.get(pk=pk)
        catched = User_Fish.objects.filter(user_id=user.id)

        fish_list = []
        for record in catched:
            if record.fish_id not in fish_list:
                fish_list.append(record.fish_id)

        result = {
            "status": 200,
            "message": "OK",
            "data": { "fishes" : fish_list },
        }
        return Response(result, status=200)                       
