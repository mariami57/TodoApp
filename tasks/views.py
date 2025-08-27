from django.contrib.auth.decorators import login_required
from django.contrib.auth.mixins import LoginRequiredMixin
from django.http import JsonResponse, HttpResponseForbidden
from django.shortcuts import get_object_or_404, redirect
from django.urls import reverse_lazy
from django.utils.timezone import now
from django.views.decorators.http import require_POST
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
        return Task.objects.filter(user=user)


class TaskDetailView(DetailView,  LoginRequiredMixin, UserIsCreatorMixin):
    model = Task
    template_name = "tasks/task-details.html"


class TaskCreateView(CreateView,  LoginRequiredMixin, UserIsCreatorMixin):
    model = Task
    form_class = TaskCreateForm
    template_name = "tasks/add-task.html"
    success_url = reverse_lazy("home")

    def get_form_kwargs(self):
        kwargs = super().get_form_kwargs()
        kwargs["user"] = self.request.user
        return kwargs

    def form_valid(self, form):
        form.instance.user = self.request.user
        return super().form_valid(form)


class TaskUpdateView(LoginRequiredMixin, UserIsCreatorMixin, UpdateView):
    model = Task
    form_class = TaskUpdateForm
    template_name = "tasks/edit-task.html"

    def get_success_url(self):
        next_url = self.request.GET.get("next")
        if next_url:
            return next_url

        return reverse_lazy("home")

@login_required
def task_delete_view(request, pk):
    task = Task.objects.get(pk=pk)
    if request.user.pk == task.user.pk:
        task.delete()
        next_url = request.POST.get("next")
        if next_url:
            return redirect(next_url)
        return redirect("home")
    else:
        return HttpResponseForbidden("You are not not allowed to delete this task")


@login_required
@require_POST
def complete_task_ajax(request, pk):
    try:
        task = Task.objects.get(pk=pk, user=request.user)
        task.status = "completed"
        task.accomplished_at = now()
        task.save()
        return JsonResponse({
            "success": True,
            "task_id": pk,
            "accomplished_at": task.accomplished_at.strftime("%Y-%m-%d %H:%M"),
        })
    except Task.DoesNotExist:
        return JsonResponse({"success": False, "error": "Task not found"}, status=404)