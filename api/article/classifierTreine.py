from .models import Articles
from sklearn.model_selection import train_test_split
from sklearn.linear_model import Perceptron
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.pipeline import Pipeline
from sklearn import metrics
from nltk.corpus import stopwords
from api import settings
import pickle

def treiningModel ():
    tagList = ["истории", "новости", "разбор", "шапито"] 
    tagDict = {"истории": 1, "новости": 2, "разбор": 3, "шапито": 4}

    articles = Articles.objects.all()

    articlesList = {}
    articlesList["content"] = []
    articlesList["tag"] = []
    for article in articles:
        if (article.content is not None):
            articlesList["content"].append(article.content)
            articlesList["tag"].append(tagDict[article.tag.name])

    textTrain, textTest, tagTrain, tagTest = train_test_split(articlesList["content"], articlesList["tag"], test_size=0.2, random_state=0)

    objectModel = Pipeline([
        ('vect', CountVectorizer(stop_words=stopwords.words("russian"))),
        ('clf', Perceptron())
    ])

    objectModel.fit(textTrain, tagTrain)

    resultCheck = objectModel.predict(textTest)
    
    file = open("classifierModel.txt", "wb")
    pickle.dump(objectModel, file)
    print(metrics.classification_report(tagTest, resultCheck))
    file.close()

