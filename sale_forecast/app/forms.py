from django import forms
from .models import CSVFiles

class CSVUploadForm(forms.ModelForm):
    class Meta:
        model = CSVFiles
        fields = ['file']