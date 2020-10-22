from django.urls import path, include

from api import views


urlpatterns = [
    path('fishes/', views.FishListAPIView.as_view()),
    path('fishes/<int:pk>/', views.FishDetailAPIView.as_view()),
]
