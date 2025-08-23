from django import forms

from tasks.models import Task


class TaskBaseForm(forms.ModelForm):
    class Meta:
        model = Task

        exclude = ["created_at", "accomplished_at", "status", "user"]

        widgets = {
            "description": forms.Textarea(attrs={"cols": 80, "rows": 4}),
        }


class TaskCreateForm(TaskBaseForm):
    pass


class TaskUpdateForm(TaskBaseForm):
    pass

class TaskDeleteForm(TaskBaseForm):
    pass