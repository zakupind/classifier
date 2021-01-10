from django.urls import path

from . import views

# from . import prepare

urlpatterns = [
    # path('/articles/db', prepare.goDb())
    path('get', views.ArticlesView.as_view())
]