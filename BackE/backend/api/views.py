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
import matplotlib.pyplot as plt
import matplotlib.image as mpimg
import glob

# 테스트
from PIL import Image

import random

# object detection
import numpy as np
import os
import pathlib
# import six.moves.urlib as urllib
import sys
import tarfile
import tensorflow as tf
import zipfile

from collections import defaultdict
from io import StringIO
from matplotlib import pyplot as plt
from PIL import Image, ImageChops

from object_detection.utils import ops as utils_ops
from object_detection.utils import label_map_util
from object_detection.utils import visualization_utils as vis_util

tf.compat.v1.enable_eager_execution()

# patch tf1 into `utils.ops`
utils_ops.tf = tf.compat.v1

# Patch the location of gfile
tf.gfile = tf.io.gfile

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
            fish = get_object_or_404(User_Fish, pk=self.request.query_params.get('user_fish_id', None), user_id=user.id)
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


# 유저가 낚시한 물고기(낚시 히스토리 아이콘 색칠 용)
class UserFishHistory(APIView):
    def post(self, request):
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
            all_fishes = Fish.objects.filter(name__contains=keyword).exclude(image='')
        else:
            all_fishes = Fish.objects.all().exclude(image='')

        for fish in all_fishes:
            if fish.id in fish_list:
                fish_info.append({"id": fish.id, "name": fish.name, "fish_type": fish.fish_type, "img": fish.image, "catched": True})
            else:
                fish_info.append({"id": fish.id, "name": fish.name, "fish_type": fish.fish_type, "img": fish.image2, "catched": False})

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
                if spots.count() >= 500:
                    spots = random.sample(list(spots), 500)
                serializer = SpotSerializer(spots, many=True)
            except Http404:
                result = {
                    "status": 200,
                    "message": "No Record",
                }
                return Response(result, status=200) 
        else:
            spots = Spot.objects.all()
            spots = random.sample(list(spots), 500)
            serializer = SpotSerializer(spots, many=True)

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
    FISH_MAP = {"hexagrammidae": 1, "mackerel": 2, "girellapunctata": 3, "mugil": 4, "blackseabream": 5,
                "redsnapper": 6,
                "kingfish": 7, "japanesehalfbeak": 8, "darkbandedrockfish": 9, "horsemackerel": 10,
                "ridgedeyflounder": 11, "bass": 12,
                "dottedgizzardshad": 13, "demoiselle": 14, "rockfish": 15, "붕장어": 16, "무늬오징어": 17,
                "embiotocidae": 18,
                "갑오징어": 19, "넙치": 20, "stripedbeakperch": 21, "northernwhiting": 22, "살오징어": 23, "쥐치": 24,
                "주꾸미": 25, "fluke": 26, "goby": 27, "한치(오징어류)": 28, "rabbitfish": 29, "bluespottedmudhopper": 30,
                "spanishmackerel": 31, "문어": 32, "쏨벵이": 33, "platycephalusindicus": 34, "백조기(보구치?)": 35,
                "parapristipoma": 36,
                "yellowtai": 37, "longtoothgrouper": 38, "croaker": 39, "redstingray": 40, "largeyellowcroaker": 41,
                "whitecroaker": 42, "쏨뱅이": 43}
    
    PATH_TO_LABELS = os.getcwd() + '/api/files/fish_label_map.pbtxt'
    category_index = label_map_util.create_category_index_from_labelmap(PATH_TO_LABELS, use_display_name=True)
    
    def post(self, request):
        execution_path = os.getcwd() + '/api/fixtures/'
        img = request.FILES['img']
        image = Image.open(img)
        image.save(execution_path+'image.jpg')

        model_name = 'fish_inception_v2_graph'
        detection_model = self.load_model(model_name)
        image_path = execution_path+'image.jpg'
        result_image = self.show_inference(detection_model, image_path)

        size = (256,256)
        if result_image.mode != 'RGB':
            result_image = result_image.convert('RGB')
        result_image.thumbnail(size, Image.ANTIALIAS)
        image_size = result_image.size

        if image_size[0] > image_size[1]:
            change_size = int(256*image_size[1]/image_size[0])
            result_image = result_image.resize((256, change_size))
        else:
            change_size = int(256*image_size[0]/image_size[1])
            result_image = result_image.resize((change_size,256))

        image_size = result_image.size
        thumb = result_image.crop((0,0,size[0],size[1]))

        offset_x = max((size[0]-image_size[0])/2,0)
        offset_y = max((size[1]-image_size[1])/2,0)
        thumb = ImageChops.offset(thumb, int(offset_x), int(offset_y))
        thumb.save(execution_path+'image.jpg')

        prediction = CustomImagePrediction()
        prediction.setModelTypeAsResNet()
        prediction.setModelPath(
        os.path.join(execution_path, "model.h5"))
        prediction.setJsonPath(
        os.path.join(execution_path, "model_class.json"))
        prediction.loadModel(num_objects=31)

        predictions, probabilities = prediction.predictImage(execution_path+'image.jpg', result_count=5)
        
        data = []
        for eachPrediction, eachProbability in zip(predictions, probabilities):
            fish_pk = self.FISH_MAP[eachPrediction]
            print(fish_pk.__class__)
            # 여기서 fish_pk로 물고기 한글 이름 DB로 가져와야함
            FDA = FishDetailAPIView()
            fish = FDA.get_object(fish_pk)
            fish_name = fish.name
            data_line = {}
            data_line['id'] = fish_pk
            data_line['name'] = fish_name
            data_line['probability'] = eachProbability
            data.append(data_line)
            # print(fish_name, eachProbability)

        result = {
            "status": 200,
            "message": "OK",
            "data": {"predictions": data},
        }


        return Response(result, status=200)

    def load_model(self, model_name):
        model_dir = os.getcwd() + '/api/files/' + model_name
        model_dir = pathlib.Path(model_dir)/"saved_model"
        model = tf.compat.v2.saved_model.load(str(model_dir),None)
        return model
    
    def run_inference_for_single_image(self, model, image):
        image = np.asarray(image)
        input_tensor = tf.convert_to_tensor(image)
        input_tensor = input_tensor[tf.newaxis,...]
        
        model_fn = model.signatures['serving_default']
        output_dict = model_fn(input_tensor)
        
        num_detections = int(output_dict.pop('num_detections'))
        output_dict = {key:value[0, :num_detections].numpy()
                    for key,value in output_dict.items()}
        output_dict['num_detections'] = num_detections
        
        output_dict['detection_classes'] = output_dict['detection_classes'].astype(np.int64)
        
        if 'detection_masks' in output_dict:
            detection_masks_reframed = utils_ops.reframe_box_masks_to_image_masks(
                output_dict['detection_masks'], output_dict['detection_boxes'],
                image.shape[0], image.shape[1])
            detection_masks_reframed = tf.cast(detection_masks_reframed > 0.5,
                                            tf.uint8)
            ouput_dict['detection_masks_reframed'] = detection_masks_reframed.numpy()
            
        return output_dict
    
    def show_inference(self, model, image_path):
        image_np = np.array(Image.open(image_path))
        
        output_dict = self.run_inference_for_single_image(model, image_np)
        
        vis_util.visualize_boxes_and_labels_on_image_array(
            image_np,
            output_dict['detection_boxes'],
            output_dict['detection_classes'],
            output_dict['detection_scores'],
            self.category_index,
            instance_masks=output_dict.get('detection_masks_reframed',None),
            use_normalized_coordinates=True,
            line_thickness=8
        )
        
        boxes = output_dict['detection_boxes']
        image = Image.open(image_path)
        im_width, im_height = image.size
        (left, right, top, bottom) = (boxes[0][1]*im_width, boxes[0][3]*im_width, boxes[0][0]*im_height,boxes[0][2]*im_height)
        area = (left, top, right, bottom)
        cropped_image = image.crop(area)
        
        return cropped_image
