from django.urls import path

from common.views import HomeAPI

urlpatterns = [
    path('', HomeAPI.as_view(), name='home-api'),
]