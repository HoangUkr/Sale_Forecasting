from django.shortcuts import render
from .forms import CSVUploadForm
from .models import CSVFiles
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import io

from .utils import *

# Import library for data processing
import numpy as np
import pandas as pd

@csrf_exempt
def upload_csv_file(request):
    context = {}
    statusCode = 200
    # print(f"File: {request.FILES.get('file')}")
    if request.method == 'POST' and request.FILES.get('file'):
        try:
            file = request.FILES['file']
            # orders = pd.read_csv(file)
            orders = pd.read_csv(file)
            context.update({
                'total_order': get_total_order(orders),
                'total_revenue': get_total_revenue(orders),
                'most_sold': get_most_sold(orders),
                'least_sold': get_least_sold(orders),
                'daily_sale': get_total_order_by_date(orders),
                'dish_proportion': get_dish_distribution(orders)
            })
            return JsonResponse(data=context, status=statusCode)
        except Exception as e:
            print(f'Exception: {e}')
            context.update({
                'error': 'Error when processing file'
            })
            status = 400
            return JsonResponse(data=context, status=statusCode) 
    context.update({
        'error': 'Error when uploading file'
    })
    status = 400
    return JsonResponse(data=context, status=statusCode)

def show_history(request):
    files = CSVFiles.objects.all().order_by('-uploaded_at')
    return render(request, 'history.html', {'files': files})

def index(request):
    return render(request, 'PAGE/dashboard.html', {})