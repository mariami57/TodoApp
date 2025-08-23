from django import forms

from tasks.models import Task


class TaskBaseForm(forms.ModelForm):
    class Meta:
        model = Task

        exclude = ["created_at", "accomplished_at", "status", "user"]

        widgets = {
            "name": forms.TextInput(),
            "description": forms.Textarea(attrs={"cols": 40, "rows": 4},),
        }

    def __init__(self, *args, **kwargs):
        self.user = kwargs.pop("user", None)
        super().__init__(*args, **kwargs)

    def clean_name(self):
        name = self.cleaned_data["name"]

        if not self.user:
            return name

        if Task.objects.filter(user=self.user, name__iexact=name, status = "pending").exists():
            raise forms.ValidationError("A pending task with this name already exists")
        return name


class TaskCreateForm(TaskBaseForm):
    pass


class TaskUpdateForm(TaskBaseForm):
    pass

class TaskDeleteForm(TaskBaseForm):
    pass