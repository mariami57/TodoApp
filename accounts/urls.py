from django.urls import path, include
from accounts.views import RegisterAPI, CustomLoginView, ProfileDetailView, logout_api, profile_delete_view, ProfileUpdateView

urlpatterns = [
    path('register/', RegisterAPI.as_view(), name='sign-in'),
    path('login/', CustomLoginView.as_view(), name='login'),
    path('logout/', logout_api, name='logout'),

    path('<int:pk>/', include([
       path('details/', ProfileDetailView.as_view(), name='profile-details'),
       path('delete/', profile_delete_view, name='profile-delete'),
       path('edit/', ProfileUpdateView.as_view(), name='profile-update'),
    ]))
]