from django.contrib.auth.base_user import AbstractBaseUser
from django.db import models

from accounts.managers import ToDoManager


# Create your models here.
class ToDoUser(AbstractBaseUser):
    username = models.CharField(max_length=100, unique=True)
    email = models.EmailField(max_length=100, unique=True)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)


    objects = ToDoManager()
    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["username"]