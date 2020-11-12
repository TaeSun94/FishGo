from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response

import numpy as np
import os
import pathlib
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

# Create your views here.
class FishDetection(APIView):
    PATH_TO_LABELS = os.getcwd() + '/detect/files/fish_label_map.pbtxt'
    category_index = label_map_util.create_category_index_from_labelmap(PATH_TO_LABELS, use_display_name=True)

    def get(self, request):
        execution_path = os.getcwd() + '/detect/fixtures/'
        img = request.FILES['img']
        image = Image.open(img)
        image.save(execution_path+'image.jpg')
        # PATH_TO_LABELS = '/home/team2/fishgo/detection/data/fish_label_map.pbtxt'

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

        return Response("ok",status=200)

    def load_model(self, model_name):
        model_dir = os.getcwd() + '/detect/files/' + model_name
        model_dir = pathlib.Path(model_dir)/"saved_model"
        model = tf.saved_model.load(str(model_dir))
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

    
