import os
import lxml.etree as ET
from article.models import Articles, Tag, Source
from api import settings

def getNewsFields(fileName):
    fields = {}
    newTree = ET.parse(fileName)
    fields["title"] = newTree.find(".//title").text
    fields["secondTitle"] = newTree.find(".//second_title").text
    fields["description"] = newTree.find(".//description").text
    fields["date"] = newTree.find(".//date").text
    fields["content"] = newTree.find(".//content").text
    fields["sourceName"] = newTree.find(".//name").text
    fields["sourceUrl"] = newTree.find(".//url").text
    fields["tag"] = newTree.find(".//nameTag").text

    return fields

def updateOrSaveNew(fields):
    tag = Tag()
    tag.name = fields["tag"]
    tag.save()

    source = Source()
    source.sourceName = fields["sourceName"]
    source.sourceUrl = fields["sourceUrl"]
    source.save()

    articleNew = Articles()
    articleNew.title = fields["title"]
    articleNew.secondTitle = fields["secondTitle"]
    articleNew.description = fields["description"]
    articleNew.date = fields["date"]
    articleNew.content = fields["content"]
    articleNew.tag = tag
    articleNew.source = source

    articleNew.save()

def goDb():
    newsFilesName = os.listdir(str(settings.BASE_DIR) + "\\articleList\\истории")

    for fileName in newsFilesName:
        fileName = getNewsFields(str(settings.BASE_DIR) + "\\articleList\\истории\\" + fileName)
        updateOrSaveNew(fileName)
        print(fileName)

    return 'go'
