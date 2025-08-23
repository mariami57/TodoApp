from django.urls import path, include

from tasks.views import TaskCreateView, TaskUpdateView, TaskDeleteView, TaskDetailView, TaskListView

urlpatterns = [
    path("add/", TaskCreateView.as_view(), name="add"),
    path("list/", TaskListView.as_view(), name="list"),
    path("<int:pk>/", include ([
        path("edit/", TaskUpdateView.as_view(), name="edit"),
        path("delete/", TaskDeleteView.as_view(), name="delete"),
        path("deatils/", TaskDetailView.as_view(), name="details"),
    ]))
]