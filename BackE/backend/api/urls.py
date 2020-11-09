from django.urls import path, include

from api import views


urlpatterns = [
    path('fishes/', views.FishListAPIView.as_view()),
    path('fishes/<int:pk>/', views.FishDetailAPIView.as_view()),
    path('users/', views.UserViewSet.as_view({'get': 'list'})),
    path('users/<int:pk>/', views.UserViewSet.as_view({'get': 'retrieve'})),
    path('users/catches/', views.UserFishHistory.as_view()),
    path('fishes/<int:pk>/catches/', views.UserFishListAPIView.as_view()),
    path('fishes/<int:pk>/catch/', views.UserFishAPIView.as_view()),
    path('spots/', views.SpotFishAPIView.as_view()),
    path('spots/<int:pk>/', views.SpotDetailAPIView.as_view()),
    path('userfishes/', views.UserAllFishAPIView.as_view()),
    path('userfishes/<int:pk>/', views.UserAllFishDetail.as_view()),
    path('fishdiscriminations/', views.FishDiscrimination.as_view()),
] 
