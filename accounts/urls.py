from django.contrib.auth.views import LogoutView
from django.urls import path

from accounts.views import RegisterView, CustomLoginView

urlpatterns = [
    path('register/', RegisterView.as_view(), name='sign-in'),
    path('login/', CustomLoginView.as_view(template_name='accounts/login.html'), name='login'),
    path('logout/', LogoutView.as_view(), name='logout'),

]