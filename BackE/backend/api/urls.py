from django.urls import path, include

from api import views


urlpatterns = [
    path('fishes/', views.FishListAPIView.as_view()),
    path('fishes/<int:pk>/', views.FishDetailAPIView.as_view()),
    path('users/', views.UserViewSet.as_view({'get': 'list'})),
    path('users/<int:pk>/', views.UserViewSet.as_view({'get': 'retrieve'})),
    path('users/<int:pk>/catches', views.UserFishHistory.as_view()),
    path('fishes/<int:pk>/catches', views.UserFishListAPIView.as_view()),
    path('fishes/<int:pk>/catch', views.UserFishAPIView.as_view()),
]
