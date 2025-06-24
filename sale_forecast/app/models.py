from django.db import models
from django.core.validators import FileExtensionValidator

# Create your models here.
class CSVFiles(models.Model):
    file = models.FileField(
        upload_to='csv_uploads/',
        validators = [FileExtensionValidator(allowed_extensions=['csv'])]
    )
    uploaded_at = models.DateTimeField(auto_now_add=True)

    