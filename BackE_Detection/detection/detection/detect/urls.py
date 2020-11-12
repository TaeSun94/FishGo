from django.urls import path, include
from detect import views

urlpatterns = [
    path('fishdetections/', views.FishDetection.as_view()),
]