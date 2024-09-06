from django.contrib import admin
from .models import PythonModel,BashModel

admin.site.register(PythonModel)
admin.site.register(BashModel)