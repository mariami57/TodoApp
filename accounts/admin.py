from django.contrib import admin
from django.contrib.auth import get_user_model
from django.contrib.auth.admin import UserAdmin
from django.contrib.auth.forms import UserCreationForm

# Register your models here.
UserModel = get_user_model()

@admin.register(UserModel)
class UserAdmin(UserAdmin):
    add_form = UserCreationForm
    list_display = ("email", "username")

    fieldsets = (
        (None, {"fields": ("email", "password",)}),
        (("Personal info"), {"fields": ("username",)}),
        (
            ("Permissions"),
            {
                "fields": (
                    "is_active",
                    "is_staff",
                ),
            },
        ),
        (("Important dates"), {"fields": ("last_login",)}),
    )
    add_fieldsets = (
        (
            None,
            {
                "classes": ("wide",),
                "fields": ("email",  "password1", "password2",),
            },
        ),
    )