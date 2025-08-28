from django.contrib.auth.views import LoginView
from django.urls import reverse_lazy
from django.views.generic import CreateView, DetailView
from accounts.forms import ToDoUserCreationForm, CustomLoginForm
from accounts.models import Profile


# Create your views here.
class RegisterView(CreateView):
    form_class = ToDoUserCreationForm
    template_name = "accounts/sign-in.html"
    success_url = reverse_lazy('home')

class CustomLoginView(LoginView):
    authentication_form = CustomLoginForm
    template_name = "accounts/login.html"

class ProfileDetailView(DetailView):
    model = Profile
    template_name = "accounts/profile-details.html"