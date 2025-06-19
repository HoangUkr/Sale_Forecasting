from django.shortcuts import render
from .forms import CSVUploadForm
from .models import CSVFiles

# Create your views here.
def upload_csv_file(request):
    if request.method == 'POST':
        form = CSVUploadForm(request.POST, request.FILES)
        if form.is_valid():
            form.save()
            return ''
    else:
        form = CSVUploadForm()
    return render(request, 'main.html', {'form': form})

def show_history(request):
    files = CSVFiles.objects.all().order_by('-uploaded_at')
    return render(request, 'history.html', {'files': files})

def index(request):
    return render(request, 'PAGE/dashboard.html', {})