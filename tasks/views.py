from django.contrib.auth.mixins import LoginRequiredMixin
from django.urls import reverse_lazy
from django.views.generic import ListView, DetailView, CreateView, UpdateView, DeleteView

from common.mixins import UserIsCreatorMixin
from tasks.forms import TaskCreateForm, TaskUpdateForm
from tasks.models import Task


# Create your views here.
class TaskListView(ListView, LoginRequiredMixin):
    model = Task
    template_name = "tasks/tasks-list.html"

    def get_queryset(self):
        user = self.request.user
        if user.is_superuser:
            return Task.objects.all()
        return Task.objects.filter(user=self.request.user)


class TaskDetailView(DetailView,  LoginRequiredMixin, UserIsCreatorMixin):
    model = Task
    template_name = "tasks/task-details.html"


class TaskCreateView(CreateView,  LoginRequiredMixin, UserIsCreatorMixin):
    model = Task
    form_class = TaskCreateForm
    template_name = "tasks/add-task.html"
    success_url = reverse_lazy("home")

    def form_valid(self, form):
        form.instance.user = self.request.user
        return super().form_valid(form)


class TaskUpdateView(UpdateView,  LoginRequiredMixin, UserIsCreatorMixin):
    model = Task
    form_class = TaskUpdateForm
    template_name = "tasks/edit-task.html"
    success_url = reverse_lazy("home")

class TaskDeleteView(DeleteView,  LoginRequiredMixin, UserIsCreatorMixin
                     ):
    model = Task
    success_url = reverse_lazy("home")
