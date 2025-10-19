from django.contrib.auth import get_user_model
from django.utils import timezone
from django.db import models

# Create your models here.

UserModel = get_user_model()
class Task(models.Model):

    STATUS_CHOICES = [
        ("completed", "Completed"),
        ("pending", "Pending"),
    ]

    name = models.CharField(max_length=100)
    description = models.TextField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    accomplished_at = models.DateTimeField(null=True, blank=True)
    status = models.CharField(choices = STATUS_CHOICES, default="pending")
    user = models.ForeignKey(UserModel, on_delete=models.CASCADE)
    due_by = models.DateTimeField(null=True, blank=True)

    def save(self, *args, **kwargs):
        if self.status == "completed" and self.accomplished_at is None:
            self.accomplished_at = timezone.now()
        elif self.status =="pending":
            self.accomplished_at = None

        super().save(*args, **kwargs)