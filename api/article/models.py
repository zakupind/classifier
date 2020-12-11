from django.db import models

# Create your models here.
class Tag(models.Model):
    name = models.CharField(max_length=50)

class Source(models.Model):
    sourceName = models.CharField(max_length=50)
    sorceUrl = models.CharField(max_length=100, null=True)

class Articles(models.Model):
    title = models.CharField(max_length=1000)
    secondTitle = models.CharField(max_length=1000, null=True)
    description = models.CharField(max_length=1000, null=True)
    date = models.DateTimeField()
    content = models.TextField()
    tag = models.ForeignKey(Tag, on_delete=models.CASCADE)
    source = models.ForeignKey(Source, on_delete=models.CASCADE)



    
