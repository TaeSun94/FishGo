from django.shortcuts import render
from django.views import View
# Create your views here.
#이메일 인증 기능
# class EmaiActivate(View):
#     def get(self, request, uidb64, token):
#         try:
#             uid = force_text(urlsafe_base64_decode(uidb64))
#             user = Users.objects.get(pk=uid)
#             user_dic = jwt.decode(token,SECRET_KEY,algorithm='HS256')
#             if user.id == user_dic["user"]:
#                 user.is_active = True
#                 user.save()
#                 return redirect("http://127.0.0.1/rest-auth/signin")

#             return JsonResponse({'message':'auth fail'}, status=400)
#         except ValidationError:
#             return JsonResponse({'message':'type_error'}, status=400)
#         except KeyError:
#             return JsonResponse({'message':'INVALID_KEY'}, status=400)


