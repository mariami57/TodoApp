from django import forms

from tasks.models import Task


class TaskBaseForm(forms.ModelForm):
    class Meta:
        model = Task


class TaskCreateForm(TaskBaseForm):
    class Meta(TaskBaseForm.Meta):
        exclude = ("accomplished_at", )

class TaskUpdateForm(TaskBaseForm):
    class Meta(TaskBaseForm.Meta):
        exclude = ("accomplished_at",)

class TaskDeleteForm(TaskBaseForm):
    pass