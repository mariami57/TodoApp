from django.contrib.auth import get_user_model
from django.contrib.auth.decorators import login_required
from django.contrib.auth.mixins import LoginRequiredMixin
from django.contrib.auth.views import LoginView
from django.http import HttpResponseForbidden
from django.shortcuts import redirect
from django.urls import reverse_lazy, reverse

from django.views.generic import CreateView, DetailView, UpdateView
from accounts.forms import ToDoUserCreationForm, CustomLoginForm, ProfileEditForm
from accounts.models import Profile
from common.mixins import UserIsCreatorMixin
from django.utils.decorators import method_decorator

# Create your views here.
UserModel = get_user_model()

@method_decorator(name="dispatch")
class RegisterAPI(View):
    def post(self, request, *args, **kwargs):
        try:
            if request.content_type == "application/json":
                data = json.loads(request.body)
            else:
                data = request.POST
        except Exception as e:
            return JsonResponse({"success": False, "errors": {"__all__": [str(e)]}}, status=400)

        form = ToDoUserCreationForm(data)
        if form.is_valid():
            user = form.save()  
            return JsonResponse({
                "success": True,
                "user": {
                    "username": user.username,
                    "email": user.email
                }
            })
        else:
            return JsonResponse({
                "success": False,
                "errors": form.errors
            }, status=400)
    #Uses signal to create a profile for the user

class CustomLoginView(LoginView):
    authentication_form = CustomLoginForm
    template_name = "accounts/login.html"

class ProfileDetailView(LoginRequiredMixin, DetailView):
    model = Profile
    template_name = "accounts/profile-details.html"
    context_object_name = "profile"

    def get_queryset(self):
        return Profile.objects.filter(user=self.request.user)

class ProfileUpdateView(LoginRequiredMixin, UserIsCreatorMixin, UpdateView):
    model = Profile
    template_name = "accounts/edit-profile.html"
    form_class = ProfileEditForm

    def get_success_url(self):
        return reverse('profile-details', kwargs={'pk': self.object.user.pk})

@login_required
def profile_delete_view(request, pk):
    user = UserModel.objects.get(pk=pk)
    if request.user.is_authenticated and request.user.pk == user.pk:
        if request.method == "POST":
            user.delete()
            return redirect("login")
        else:
            return HttpResponseForbidden("You are not allowed to delete this profile")

