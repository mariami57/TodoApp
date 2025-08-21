from django import forms

from tasks.models import Task


class TaskBaseForm(forms.ModelForm):
    class Meta:
        model = Task


class TaskCreateForm(TaskBaseForm):
    pass

class TaskUpdateForm(TaskBaseForm):
    pass

class TaskDeleteForm(TaskBaseForm):
    pass