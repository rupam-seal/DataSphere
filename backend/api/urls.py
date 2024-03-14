from django.urls import path
from . import views

urlpatterns = [
    path('', views.api_overview, name='api-overview'),
    path('insights/', views.insight_list, name='insight-list'),
    path('insights/<int:pk>/', views.insight_detail, name='insight-detail'),
    path('insights/create/', views.insight_create, name='insight-create'),
    path('insights/update/<int:pk>/', views.insight_update, name='insight-update'),
    path('insights/delete/<int:pk>/', views.insight_delete, name='insight-delete'),
]