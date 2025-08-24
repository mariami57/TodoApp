from django.views.generic import ListView

from tasks.models import Task


# Create your views here.
class HomeView(ListView):
    template_name = 'common/home.html'
    model = Task

    def get_queryset(self):
        user = self.request.user
        return Task.objects.filter(user=user)