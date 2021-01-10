from rest_framework import serializers

from .models import Articles, Tag, Source

class ArticlesSerializer(serializers.ModelSerializer):

    class Meta:
        model = Articles
        fields = "__all__"

class TagSerializer(serializers.ModelSerializer):

    class Meta:
        model = Tag
        fields = "__all__"

class SourceSerializer(serializers.ModelSerializer):

    class Meta:
        model = Source
        fields = "__all__"