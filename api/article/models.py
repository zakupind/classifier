from django.db import models

# Create your models here.
class Tag(models.Model):
    name = models.CharField(max_length=50, unique=True)

    def __str__(self):
        return self.name

class Source(models.Model):
    sourceName = models.CharField(max_length=50)
    sourceUrl = models.CharField(max_length=100, null=True)

    def __str__(self):
        return self.sourceName

class Articles(models.Model):
    title = models.CharField(max_length=1000)
    secondTitle = models.CharField(max_length=1000, null=True)
    description = models.CharField(max_length=1000, null=True)
    date = models.CharField(max_length=20)
    content = models.TextField(null=True)
    tag = models.ForeignKey(Tag, on_delete=models.CASCADE)
    source = models.ForeignKey(Source, on_delete=models.CASCADE)

    def __str__(self):
        return self.title
