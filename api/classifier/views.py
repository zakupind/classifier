from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.views import APIView
import pickle
import json
# Create your views here.

class ClassifierView(APIView):

    def post(self, request):
        payload = json.loads(request.body)

        result = {}
        tagList = ["истории", "новости", "разбор", "шапито"]

        file = open("classifierModel.txt", "rb")
        classifierModel = pickle.load(file)
        file.close()

        numberOfCategory = classifierModel.predict([payload['text']])[0]
        result["tag"] = tagList[numberOfCategory - 1]
        return Response(result, status=200)