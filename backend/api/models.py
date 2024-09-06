from django.db import models

class PythonModel(models.Model):
    no = models.PositiveIntegerField()  
    title = models.TextField()  
    code = models.TextField()
    output = models.TextField(null=True)

    def __str__(self):
        return f"{self.no}" 
    
class BashModel(models.Model):
    no = models.PositiveIntegerField()  
    title = models.TextField()  
    code = models.TextField()
    output = models.TextField(null=True)

    def __str__(self):
        return f"{self.no}" 
