from django.contrib import admin
from django.urls import path, include

# 이메일 인증
from allauth.account.views import confirm_email as allauthemailconfirmation

urlpatterns = [
    path('admin/', admin.site.urls),

    path('users/', include('accounts.urls')),
    path("api/", include("api.urls")),
    path("account/", include("allauth.urls")),
    
    path('rest-auth/', include('rest_auth.urls')),
    path('rest-auth/signup/', include('rest_auth.registration.urls')),


    path('rest-auth/account-confirm-email/<int:pk>/', allauthemailconfirmation,
       name='account_confirm_email'),
]
