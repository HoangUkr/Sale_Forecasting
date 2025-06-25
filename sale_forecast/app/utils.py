from django.views.decorators.csrf import csrf_exempt
from .models import *
import pandas as pd

def get_total_order(df):
    return int(df['Quantity'].sum())

def get_total_revenue(df):
    return float((df['Product Price'] * df['Quantity']).sum())

def get_most_sold(df):
    top_dish = df[['Item Name', 'Quantity']].groupby(by='Item Name').sum().sort_values(by='Quantity', ascending=False).reset_index()
    return str(top_dish.iloc[0]['Item Name'])

def get_least_sold(df):
    top_dish = df[['Item Name', 'Quantity']].groupby(by='Item Name').sum().sort_values(by='Quantity', ascending=True).reset_index()
    return str(top_dish.iloc[0]['Item Name'])

def get_total_order_by_date(df):
    df['Order Date'] = pd.to_datetime(df['Order Date'], dayfirst=True)
    daily_sum_order = df.groupby(df['Order Date'].dt.date)['Quantity'].sum().reset_index()
    daily_sum_order['Order Date'] = pd.to_datetime(daily_sum_order['Order Date'], dayfirst=True)
    context = {
        date.strftime('%d/%m/%Y'): quantity
        for date, quantity in zip(daily_sum_order['Order Date'], daily_sum_order['Quantity'])
    }
    return context

def get_dish_distribution(df):
    total = df['Quantity'].sum()
    all_dishes = df['Item Name'].unique()
    context = {}
    for dish in all_dishes:
        dish_df = df[df['Item Name'] == dish]['Quantity'].sum()
        percentage = round((dish_df / total) * 100, 2)
        context[dish] = percentage
    return context



# Get all uploaded file
# If record exist, when merging update this record in dataset 
# Merge it into single dataset
# Return the merge dataset
def merge_dataset(df):
    pass