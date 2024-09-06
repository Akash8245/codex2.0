from django.http import JsonResponse
from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import PythonSerializers,BashSerializers
from .models import PythonModel,BashModel

class Test(APIView):
    def get(self, request):
        return JsonResponse({"message": "Hello"})  # Returning a JSON response

class PythonView(APIView):
    def get(self,request):
        data = PythonModel.objects.all()
        serializer = PythonSerializers(data,many=True)
        return Response(serializer.data)

class BashView(APIView):
    def get(self,request):
        data = BashModel.objects.all()
        serializer = BashSerializers(data,many=True)
        return Response(serializer.data)
