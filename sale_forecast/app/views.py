from django.shortcuts import render
from .forms import CSVUploadForm
from .models import CSVFiles
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt

# Import library for data processing
import numpy as np
import pandas as pd

@csrf_exempt
def upload_csv_file(request):
    context = {}
    statusCode = 200
    print(f"File: {request.FILES.get('file')}")
    if request.method == 'POST' and request.FILES.get('file'):
        file = request.FILES['file']
        orders = pd.read_csv(file)
        context.update({
            'total_order': int(get_total_order(orders)),
            'total_revenue': int(get_total_revenue(orders)),
            'most_sold': str(get_most_sold(orders)),
            'least_sold': str(get_least_sold(orders))
        })
        return JsonResponse(data=context, status=statusCode)
    context.update({
        'error': 'Error when uploading file'
    })
    status = 400
    return JsonResponse(data=context, status=statusCode)

@csrf_exempt
def get_total_order(df):
    return df['Quantity'].sum()

@csrf_exempt
def get_total_revenue(df):
    return (df['Product Price'] * df['Quantity']).sum()

@csrf_exempt
def get_most_sold(df):
    top_dish = df[['Item Name', 'Quantity']].groupby(by='Item Name').sum().sort_values(by='Quantity', ascending=False).reset_index()
    return top_dish.iloc[0]['Item Name']

@csrf_exempt
def get_least_sold(df):
    top_dish = df[['Item Name', 'Quantity']].groupby(by='Item Name').sum().sort_values(by='Quantity', ascending=True).reset_index()
    return top_dish.iloc[0]['Item Name']

def show_history(request):
    files = CSVFiles.objects.all().order_by('-uploaded_at')
    return render(request, 'history.html', {'files': files})

def index(request):
    return render(request, 'PAGE/dashboard.html', {})