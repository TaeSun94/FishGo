from django.contrib import admin
from django.urls import path, include
from accounts.views import LoginAPI, RegistrationAPI, LogoutAPIView
from accounts import views

# 이메일 인증
from allauth.account.views import confirm_email as allauthemailconfirmation

# 이미지 파일
from django.conf.urls.static import static
from django.conf import settings

urlpatterns = [
    path('admin/', admin.site.urls),

    path('user/', include('accounts.urls')),
    path("api/", include("api.urls")),
    path("account/", include("allauth.urls")),
    
    # path('rest-auth/', include('rest_auth.urls')),
    # path('rest-auth/signup/', include('rest_auth.registration.urls')),

    # 커스텀 회원가입, 로그인, 로그아웃
    path("auth/login/", LoginAPI.as_view()),
    path("auth/signup/", RegistrationAPI.as_view()),
    path("auth/logout/", LogoutAPIView.as_view()),

    # 카카오 로그인
    path('auth/callback/', views.get_token, name='get_token'),

    # 아이디 중복체크
    path('auth/check/', views.check_username, name='check_username'),

    # 유저 지우기
    path('api/user/', views.delete_user, name='delete_user'),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
