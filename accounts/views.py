from django.urls import reverse_lazy
from django.views.generic import CreateView
from accounts.forms import ToDoUserCreationForm


# Create your views here.
class RegisterView(CreateView):
    form_class = ToDoUserCreationForm
    template_name = "accounts/register.html"
    success_url = reverse_lazy('home')