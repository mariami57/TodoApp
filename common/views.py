from django.views import View
from django.http import JsonResponse
from django.contrib.auth.decorators import login_required
from django.utils.decorators import method_decorator
from tasks.models import Task
from django.views.decorators.csrf import ensure_csrf_cookie




# Create your views here.
@method_decorator(ensure_csrf_cookie, name='dispatch')
class GetCSRFToken(View):
    def get(self, request, *args, **kwargs):
        return JsonResponse({"detail": "CSRF cookie set"})

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


def current_user(request):
    if request.user.is_authenticated:
        return JsonResponse({
            "authenticated": True,
            "user":{
                "id":request.user.id,
                "username":request.user.username,
                "email":request.user.email
            }
        })

    return JsonResponse({"authenticated": False, "user": None})