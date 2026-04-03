from django.contrib.auth.decorators import login_required
from django.contrib.auth.mixins import LoginRequiredMixin
from django.http import JsonResponse, HttpResponseForbidden
from django.shortcuts import redirect
from django.urls import reverse_lazy
from django.utils.timezone import now
from django.views.decorators.http import require_POST
from django.views.generic import ListView, CreateView, UpdateView

from common.mixins import UserIsCreatorMixin
from tasks.forms import TaskCreateForm, TaskUpdateForm
from tasks.models import Task
from django.utils.decorators import method_decorator
import json

# Create your views here.
class TaskListView(ListView, LoginRequiredMixin, UserIsCreatorMixin):
    model = Task
    template_name = "tasks/tasks-list.html"

    def get_queryset(self):
        user = self.request.user
        if user.is_superuser:
            return Task.objects.all()
        return Task.objects.filter(user=user)

@method_decorator(login_required, name="dispatch")
class TaskCreateAPI(View):
    def post(self, request, *args, **kwargs):
        try:
            data = request.POST or request.body
            
            if request.content_type == "application/json":
                data = json.loads(request.body)
        except Exception as e:
            return JsonResponse({"success": False, "errors": {"__all__": [str(e)]}}, status=400)

    form = TaskCreateForm(data, user=request.user)

    if form.is_valid():
        task = form.save(commit=False)
        task.user = request.usertask.save()
        return JsonResponse({
            "success":True,
            "task": {
                "id": task.id,
                "name": task.name,
                "description": task.description,
                "status":task.status,
                "created_at":task.created_At.isoformat(),
                "due_by": task.due_by.isoformat() if task.due_by else None,
                "accomplished_at":task.accomplished_at.isoformat() if task.accomplished_at else None,
                "canEdit": True,
                "canDelete": True,
            }
        })
    else:
        return JsonResponse({
                "success": False,
                "errors": form.errors
            }, status=400)

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
        next_url = request.POST.get("next") or request.GET.get("next")
        if next_url:
            return redirect(next_url)
        return redirect("home")
    else:
        return HttpResponseForbidden("You are not allowed to delete this task")


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
