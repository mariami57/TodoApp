from django import forms
from django.contrib.auth import get_user_model
from django.contrib.auth.forms import UserCreationForm, AuthenticationForm

UserModel = get_user_model()

class ToDoUserCreationForm(UserCreationForm):
    class Meta(UserCreationForm.Meta):
        model = UserModel
        fields = ["email", "username"]
        labels = {
            "email": "Email",
            "username": "Username",
            "password": "Password",
        }

class CustomLoginForm(AuthenticationForm):
    username = forms.CharField(
        label="Email/Username",
    )
    password = forms.CharField(
        label="Password",
        widget=forms.PasswordInput,
    )