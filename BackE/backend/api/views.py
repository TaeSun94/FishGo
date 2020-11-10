from django.shortcuts import render
from .models import Fish, User_Fish, Spot
from accounts.models import User
from rest_framework.decorators import action, permission_classes
from rest_framework.response import Response
from .serializers import FishSerializer, UserFishSerializer, UserSerializer, SpotSerializer, SpotDetailSerializer, UserFishSimpleSerializer
from rest_framework import filters
from rest_framework.exceptions import NotAuthenticated, NotFound, ValidationError
from rest_framework.pagination import PageNumberPagination
from rest_framework.views import APIView
from django.http import Http404
from rest_framework import generics
from rest_framework import viewsets
from django.shortcuts import get_object_or_404

# 판별
from imageai.Prediction.Custom import CustomImagePrediction
import os


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
    serializer_class = FishSerializer
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
        else:
            result = {
                "status": 400,
                "message": "Bad Request",
            }
            return Response(result, status=400)

    def put(self, request):
        try:
            fish = get_object_or_404(Fish, pk=request.data.get('fish_id'))
            if request.data.get('fish_type'):
                fish.fish_type = request.data.get('fish_type')
            if request.data.get('habitat'):
                fish.habitat = request.data.get('habitat')
            if request.data.get('feed'):
                fish.feed = request.data.get('feed')
            if request.data.get('prohibition'):
                fish.prohibition = request.data.get('prohibition')
            if request.data.get('image'):
                fish.edibility = request.data.get('image')
            if request.data.get('recipe'):
                fish.recipe = request.data.get('recipe')
          
            fish.save()
            serializer = FishSerializer(fish)
            result = {
                "status": 200,
                "message": "OK",
                "data": { "fish" : serializer.data },
            }
            return Response(result, status=200) 
        except Http404:
            result = {
                "status": 404,
                "message": "Not Found",
            }
            return Response(result, status=404)

    def delete(self, request):    
        try:
            fish = get_object_or_404(Fish, pk=request.data.get('fish_id'))
            fish.delete()
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
                record = True
                if fish.id in fish_list:
                    record = True
                else:
                    record = False

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
    serializer_class = UserFishSerializer
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
            # user = User.objects.filter(pk=2)[0]
            fish = get_object_or_404(Fish, pk=pk)

            if request.data.get('length'):
                user_fishing = User_Fish(user=user, fish=fish, lat=request.data.get('lat'), lng=request.data.get('lng'), length=request.data.get('length'), img=request.FILES['img'])
            else:
                user_fishing = User_Fish(user=user, fish=fish, lat=request.data.get('lat'), lng=request.data.get('lng'), img=request.FILES['img'])
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
            if request.data.get('length'):
                fish.length = float(request.data.get('length'))
            else:
                fish.length = None
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
    def get(self, request):
        # if request.user.is_anonymous:
        #     result = {
        #         "status": 401,
        #         "message": "Unauthorized",
        #     }
        #     return Response(result, status=401) 
        # else:

        keyword = self.request.query_params.get('keyword', None)
        pk = request.data.get('user_id')
        user = User.objects.get(pk=pk)
        catched = User_Fish.objects.filter(user_id=user.id)

        fish_info = []
        fish_list = []
        for record in catched:
            if record.fish_id not in fish_list:
                fish_list.append(record.fish_id)

        if keyword:
            all_fishes = Fish.objects.filter(name__contains=keyword)
        else:
            all_fishes = Fish.objects.all()

        # 이부분 사진 수정 필요
        for fish in all_fishes:
            if fish.id in fish_list:
                fish_info.append({"id": fish.id, "name": fish.name, "fish_type": fish.fish_type, "img": fish.image, "catched": True})
            else:
                fish_info.append({"id": fish.id, "name": fish.name, "fish_type": fish.fish_type, "img": "", "catched": False})

        result = {
            "status": 200,
            "message": "OK",
            "data": { "fishes" : fish_info },
        }
        return Response(result, status=200)                       


# 낚시터-피쉬 점으로만
class SpotFishAPIView(APIView):
    def get(self, request):
        keyword = self.request.query_params.get('keyword', None)

        if keyword:
            try:
                fish = get_object_or_404(Fish, name=keyword)
                spots = Spot.objects.filter(fishes__in=[fish.id])
                serializer = SpotSerializer(spots, many=True)
            except Http404:
                result = {
                    "status": 200,
                    "message": "No Record",
                }
                return Response(result, status=200) 
        else:
            serializer = SpotSerializer(Spot.objects.all(), many=True)

        result = {
            "status": 200,
            "message": "OK",
            "data": { "spots" : serializer.data },
        }
        return Response(result, status=200)


class SpotDetailAPIView(APIView):
    def get(self, request, pk):
        try:
            spot = get_object_or_404(Spot, pk=pk)
            serializer = SpotDetailSerializer(spot)
            result = {
                "status": 200,
                "message": "OK",
                "data": { "spot" : serializer.data },
            }
            return Response(result, status=200)

        except Http404:
            result = {
                "status": 404,
                "message": "Not Found",
                "data": {},
            }
            return Response(result, status=404) 


# 유저-피쉬 점으로만
class UserAllFishAPIView(APIView):
    def get(self, request):
        keyword = self.request.query_params.get('keyword', None)

        if keyword:
            try:
                fish = get_object_or_404(Fish, name=keyword)
                user_fishes = User_Fish.objects.filter(fish=fish.id)
                serializer = UserFishSimpleSerializer(user_fishes, many=True)
            except Http404:
                result = {
                    "status": 200,
                    "message": "No Record",
                    "data": {},
                }
                return Response(result, status=200) 
        else:
            serializer = UserFishSimpleSerializer(User_Fish.objects.all(), many=True)

        result = {
            "status": 200,
            "message": "OK",
            "data": { "userfishes" : serializer.data },
        }
        return Response(result, status=200)


class UserAllFishDetail(APIView):
    def get(self, request, pk):
        try:
            user_fish = get_object_or_404(User_Fish, pk=pk)
            serializer = UserFishSerializer(user_fish)
            result = {
                "status": 200,
                "message": "OK",
                "data": { "userfish" : serializer.data },
            }
            return Response(result, status=200)

        except Http404:
            result = {
                "status": 404,
                "message": "Not Found",
            }
            return Response(result, status=404) 


# 물고기 판별
class FishDiscrimination(APIView):
    def get(self, request):
        # execution_path = os.getcwd() + '/api/fixtures/'
        execution_path = 'http://k3c206.p.ssafy.io/s03p31c206/BackE/backend/api/fixtures/'
        prediction = CustomImagePrediction()
        prediction.setModelTypeAsResNet()
        prediction.setModelPath(
        os.path.join(execution_path, "model_ex-029_acc-0.609756.h5"))
        prediction.setJsonPath(
        os.path.join(execution_path, "model_class.json"))
        prediction.loadModel(num_objects=4)

        predictions, probabilities = prediction.predictImage(
        request.FILES['img'], result_count=4)

        data = {}
        for eachPrediction, eachProbability in zip(predictions, probabilities):
            data[eachPrediction] = eachProbability

        
        # (수정필요)물고기 pk랑 이름, 확률 같이 보내기
        result = {
            "status": 200,
            "message": "OK",
            "data": { "predictions" : data },
        }
        return Response(result, status=200)