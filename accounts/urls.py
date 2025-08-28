from django.contrib.auth.views import LogoutView
from django.urls import path, include

from accounts.views import RegisterView, CustomLoginView, ProfileDetailView, profile_delete_view

urlpatterns = [
    path('register/', RegisterView.as_view(), name='sign-in'),
    path('login/', CustomLoginView.as_view(template_name='accounts/login.html'), name='login'),
    path('logout/', LogoutView.as_view(), name='logout'),

    path('<int:pk>/', include([
       path('details/', ProfileDetailView.as_view(), name='profile-details'),
       path('delete/', profile_delete_view, name='profile-delete'),
    ]))
]