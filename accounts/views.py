from django.contrib.auth import get_user_model
from django.contrib.auth.decorators import login_required
from django.contrib.auth.views import LoginView
from django.http import HttpResponseRedirect, HttpResponseForbidden
from django.shortcuts import redirect
from django.urls import reverse_lazy, reverse

from django.views.generic import CreateView, DetailView, UpdateView
from accounts.forms import ToDoUserCreationForm, CustomLoginForm, ProfileEditForm
from accounts.models import Profile


# Create your views here.
UserModel = get_user_model()
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

class ProfileUpdateView(UpdateView):
    model = Profile
    template_name = "accounts/edit-profile.html"
    form_class = ProfileEditForm

    def get_success_url(self):
        return reverse('profile-details', kwargs={'pk': self.object.pk})




@login_required
def profile_delete_view(request, pk):
    user = UserModel.objects.get(pk=pk)
    if request.user.is_authenticated and request.user.pk == user.pk:
        if request.method == "POST":
            user.delete()
            return redirect("login")
        else:
            return HttpResponseForbidden("You are not allowed to delete this profile")

