from django import forms
from django.contrib.auth import get_user_model
from django.contrib.auth.forms import UserCreationForm, AuthenticationForm

UserModel = get_user_model()

class ToDoUserCreationForm(UserCreationForm):
    class Meta(UserCreationForm.Meta):
        model = UserModel
        fields = ["email", "username", "password1", "password2"]
        labels = {
            "email": "Email",
            "username": "Username",
            "password": "Password",
        }

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        for field in self.fields.values():
            field.help_text = None

class CustomLoginForm(AuthenticationForm):
    username = forms.CharField(
        label="Email/Username",
    )
    password = forms.CharField(
        label="Password",
        widget=forms.PasswordInput,
    )