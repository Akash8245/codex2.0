from django.urls import path
from .views import Test,PythonView,BashView,SecretView

urlpatterns = [
    path('test/', Test.as_view()),  
    path('python/',PythonView.as_view()),
    path('bash/',BashView.as_view()),
    path('secret/',SecretView.as_view()),

]
