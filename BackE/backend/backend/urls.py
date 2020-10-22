from django.contrib import admin
from django.urls import path, include
from accounts.views import LoginAPI, RegistrationAPI
from accounts import views

# 이메일 인증
from allauth.account.views import confirm_email as allauthemailconfirmation

urlpatterns = [
    path('admin/', admin.site.urls),

    path('user/', include('accounts.urls')),
    path("api/", include("api.urls")),
    path("account/", include("allauth.urls")),
    
    # path('rest-auth/', include('rest_auth.urls')),
    # path('rest-auth/signup/', include('rest_auth.registration.urls')),

    # 커스텀 회원가입, 로그인
    path("auth/login/", LoginAPI.as_view()),
    path("auth/signup/", RegistrationAPI.as_view()),

    # 카카오 로그인
    path('account/login/kakao/callback/', views.get_token, name='get_token'),

]
