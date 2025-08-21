from django.urls import reverse_lazy
from django.views.generic import ListView, DetailView, CreateView, UpdateView, DeleteView

from tasks.forms import TaskCreateForm, TaskUpdateForm
from tasks.models import Task


# Create your views here.
class TaskListView(ListView):
    model = Task
    template_name = "tasks/tasks-list.html"


class TaskDetailView(DetailView):
    model = Task
    template_name = "tasks/task-details.html"


class TaskCreateView(CreateView):
    model = Task
    form_class = TaskCreateForm
    template_name = "tasks/add-task.html"
    success_url = reverse_lazy("home")


class TaskUpdateView(UpdateView):
    model = Task
    form_class = TaskUpdateForm
    template_name = "tasks/edit-task.html"
    success_url = reverse_lazy("home")

class TaskDeleteView(DeleteView):
    model = Task
    success_url = reverse_lazy("home")
