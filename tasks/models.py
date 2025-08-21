from django.db import models

# Create your models here.
class Task(models.Model):

    STATUS_CHOICES = [
        ("completed", "Completed"),
        ("pending", "Pending"),
    ]

    name = models.CharField(max_length=100, unique=True)
    description = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    accomplished_at = models.DateTimeField()
    status = models.CharField(choices = STATUS_CHOICES, default="pending")