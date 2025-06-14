from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='index_page'),
    path('upload/', views.upload_csv_file, name='upload_csv'),
    path('history/', views.show_history, name='history_csv')
]