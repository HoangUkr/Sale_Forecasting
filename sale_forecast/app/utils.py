from django.views.decorators.csrf import csrf_exempt

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