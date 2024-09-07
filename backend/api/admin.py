from django.contrib import admin
from .models import PythonModel,BashModel,SecretModel

admin.site.register(PythonModel)
admin.site.register(BashModel)
admin.site.register(SecretModel)