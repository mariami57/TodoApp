from django.urls import path

from common.views import GetCSRFToken, HomeAPI, current_user

urlpatterns = [
    path('', HomeAPI.as_view(), name='home-api'),
    path("get-csrf/", GetCSRFToken.as_view(), name="get_csrf"),
    path("user/", current_user, name="current_user"),
]