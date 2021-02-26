from rest_framework import serializers

from .models import Articles, Tag, Source

class TagSerializer(serializers.ModelSerializer):

    class Meta:
        model = Tag
        fields = ["name"]

class SourceSerializer(serializers.ModelSerializer):

    class Meta:
        model = Source
        fields = ["sourceName", "sourceUrl"]

class ArticlesSerializer(serializers.ModelSerializer):
    tag = TagSerializer('tag', required=False)
    source = SourceSerializer('source', required=False)
    class Meta:
        model = Articles
        fields = ['id', 'title', 'content', 'secondTitle', 'date', 'description', 'content', 'tag', 'source']