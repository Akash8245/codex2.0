from django.http import JsonResponse
from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import PythonSerializers,BashSerializers,SecretSerializers
from .models import PythonModel,BashModel,SecretModel

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

class SecretView(APIView):
    def get(self, request):
        try:
            data = SecretModel.objects.get(no=1)  # Adjust the filter as needed
            serializer = SecretSerializers(data)
            return Response(serializer.data)
        except SecretModel.DoesNotExist:
            return Response({'error': 'Not found'}, status=404)