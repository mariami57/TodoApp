from django.urls import path

from common.views import GetCSRFToken, HomeAPI

urlpatterns = [
    path('', HomeAPI.as_view(), name='home-api'),
    path("get-csrf/", GetCSRFToken.as_view(), name="get_csrf"),
]