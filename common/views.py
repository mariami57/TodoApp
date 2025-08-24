from django.views.generic import ListView

from tasks.models import Task


# Create your views here.
class HomeView(ListView):
    template_name = "common/home.html"
    model = Task

    def get_queryset(self):
        user = self.request.user
        return Task.objects.filter(user=user)

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)

        user = self.request.user

        context["pending_tasks"] = Task.objects.filter(user=user, status="pending")
        context["completed_tasks"] = Task.objects.filter(user=user, status="completed")

        return context