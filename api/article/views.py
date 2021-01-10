from rest_framework.response import Response
from rest_framework.views import APIView

from .models import Articles
from .serializer import ArticlesSerializer

class ArticlesView(APIView):
    # Вывод списка статей

    def get(self, request):
        articles = Articles.objects.filter()
        serializer = ArticlesSerializer(articles, many=True)
        return Response(serializer.data)
