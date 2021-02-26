from django.urls import path

from . import views
from .classifierTreine import treiningModel

# from . import prepare

urlpatterns = [
    path('', views.ArticlesView.as_view()),
    path('get-author', views.SourceView.as_view()),
    # path('traine', treiningModel())
    # path('prepare', prepare.goDb())
]