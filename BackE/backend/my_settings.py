SECRET_KEY = {
    'secret': 'geu!0x0(pyfx+h)nz$hx#uu7ii=l91m+a6hp8a9+chi)&2#f5l',
    'algorithm': 'HS256'
}


EMAIL = {
'EMAIL_BACKEND' : 'django.core.mail.backends.smtp.EmailBackend',
'EMAIL_USE_TLS' : True,
'EMAIL_PORT' : 587,
'EMAIL_HOST' : 'smtp.gmail.com',   
'EMAIL_HOST_USER' : 'happy@likelion.org',                    
'EMAIL_HOST_PASSWORD' : 'happy2564852!!',
'SERVER_EMAIL' : 'GMAIL ID',
'REDIRECT_PAGE' : 'http://127.0.0.1:8000/rest-auth/login/'
}