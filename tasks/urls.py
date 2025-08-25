from django.urls import path, include

from tasks.views import TaskCreateView, TaskUpdateView, TaskDeleteView, TaskDetailView, TaskListView, \
    complete_task_ajax

urlpatterns = [
    path("add/", TaskCreateView.as_view(), name="add-task"),
    path("list/", TaskListView.as_view(), name="list-tasks"),
    path("<int:pk>/", include ([
        path("edit/", TaskUpdateView.as_view(), name="edit-task"),
        path("delete/", TaskDeleteView.as_view(), name="delete-task"),
        path("deatils/", TaskDetailView.as_view(), name="details-task"),
        path("complete.ajax/", complete_task_ajax, name="complete-task"),
    ]))
]