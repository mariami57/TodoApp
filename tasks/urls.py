from django.urls import path, include

from tasks.views import TaskCreateView, TaskUpdateView, TaskListView, \
    complete_task_ajax, task_delete_view

urlpatterns = [
    path("add/", TaskCreateView.as_view(), name="add-task"),
    path("list/", TaskListView.as_view(), name="list-tasks"),
    path("<int:pk>/", include ([
        path("edit/", TaskUpdateView.as_view(), name="edit-task"),
        path("delete/", task_delete_view, name="delete-task"),
        path("complete.ajax/", complete_task_ajax, name="complete-task"),
    ]))
]