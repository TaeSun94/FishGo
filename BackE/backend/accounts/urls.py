from django.urls import include, path

from . import views
from .views import Activate

urlpatterns = [
    # path('', views.UserListView.as_view()),
    # path('signup/', SignUpView.as_view()),
    # path('login/', LoginView.as_view()),
    path('activate/<str:uidb64>/<str:token>/', Activate.as_view()),
]