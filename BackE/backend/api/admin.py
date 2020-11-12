from django.contrib import admin
from api.models import Fish, User_Fish, Spot
from django.contrib.sites.models import Site

# mysite = Site.objects.get_current()
# mysite.domain = 'localhost:8000'
# # mysite.domain = 'k3c206.p.ssafy.io:8000'
# mysite.name = 'FishGo'
# mysite.save()

# Register your models here.
admin.site.register(Fish)
admin.site.register(User_Fish)
admin.site.register(Spot)

