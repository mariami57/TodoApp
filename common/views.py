from django.http import JsonResponse
from django.utils.decorators import method_decorator
from tasks.models import Task


# Create your views here.
@method_decorator(login_required, name="dispatch")
class HomeAPI(View):

    def get(self, request, *args, **kwargs):
        user = self.request.user
        
        pending_tasks = list(Task.objects.filter(user=user, status="pending").values())
        completed_tasks = list(Task.objects.filter(user=user, status="completed").values())

        data = {
            "pending_tasks": pending_tasks,
            "completed_tasks": completed_tasks
        }

        return JsonResponse(data)
