from rest_framework import serializers
from .models import PythonModel,BashModel

class PythonSerializers(serializers.ModelSerializer):
    class Meta:
        model = PythonModel
        fields = '__all__'

class BashSerializers(serializers.ModelSerializer):
    class Meta:
        model = BashModel
        fields = '__all__'