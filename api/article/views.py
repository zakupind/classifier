from rest_framework.response import Response
from rest_framework.views import APIView
from django_filters.rest_framework import DjangoFilterBackend
import json

from .models import Articles, Source, Tag
from .prepare import goDb
from .serializer import ArticlesSerializer, SourceSerializer
from .utils import CustomPaginator

from django.shortcuts import render
from django.http import HttpResponse

def index(request):
    if request.method == "GET":
        return render(request, "./templates/build/index.html")


class ArticlesView(APIView):
    # Вывод списка статей
    def get(self, request):
        queryParamTag = request.query_params['tag']
        queryParamSource = request.query_params['author']
        queryParamSearch = request.query_params['search']


        articles = Articles.objects.all()

        if queryParamTag != "":
            tag = Tag.objects.get(name=queryParamTag)
            articles = articles.filter(tag = tag)
        
        if queryParamSource != '':
            source = Source.objects.get(sourceName=queryParamSource)
            articles = articles.filter(source=source)

        if queryParamSearch != '':
            articles = articles.filter(title__icontains=queryParamSearch)

        paginator = CustomPaginator()

        return paginator.generate_response(articles, ArticlesSerializer, request)

    
    def post(self, request):
        payload = json.loads(request.body)

        tag = Tag.objects.get(name=payload["tag"])

        try:
            author = Source.objects.get(sourceName=payload["author"])
        except:
            author = Source.objects.create(
                sourceName = payload["author"],
                sourceUrl = payload["authorUrl"]
            )

        try:
            article = Articles.objects.create(
                title = payload["title"],
                secondTitle = payload["secondTitle"],
                date = payload["date"],
                content = payload["content"],
                tag = tag,
                source = author
            )
            
            return Response(status=200)
        except:
            return Response(status=500)

    def put(self, request):

        payload = json.loads(request.body)

        tag = Tag.objects.get(name=payload["tag"])

        try:
            author = Source.objects.get(sourceName=payload["author"])
        except:
            author = Source.objects.create(
                sourceName = payload["author"],
                sourceUrl = payload["authorUrl"]
            )

        article = Articles.objects.filter(id=payload["id"])
        try:
            article.update(
                title=payload["title"],
                secondTitle = payload["secondTitle"],
                date = payload["date"],
                content = payload["content"],
                tag = tag,
                source = author
            )
            return Response(status=200)
        except:
            return Response(status=500)

    def delete(self, request):
        queryId = request.query_params["id"]
        article = Articles.objects.get(id=queryId)
        article.delete()
        return Response(status=200)

class SourceView(APIView):
    # Вывод списка источников
    def get(self, request):
        source = Source.objects.filter()
        serializer = SourceSerializer(source, many=True)
        return Response(serializer.data)
