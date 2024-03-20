from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.pagination import PageNumberPagination
from .models import Insight
from .serializers import InsightSerializer

class CustomPagination(PageNumberPagination):
    page_size = 100
    page_size_query_param = 'page_size'
    max_page_size = len(Insight.objects.all())

@api_view(['GET'])
def api_overview(request):
    api_urls = {
        'Insights API Overview': {
            'Description': 'Endpoints to manage insights.',
            'endpoints': {
                'List Insights': '/insights/',
                'Detail View Insight': '/insights/<int:pk>/',
                'Create Insight': '/insights/create/',
                'Update Insight': '/insights/update/<int:pk>/',
                'Delete Insight': '/insights/delete/<int:pk>/',
            }
        }
    }
    
    pagination_info = {
        'Pagination Info': {
            'Description': 'You can paginate through results using the page parameter in the URL.',
            'endpoint': '/insights/?page=1',
        },
        'Custom Page Size': {
            'Description': 'Specify the number of items per page using the page_size parameter.',
            'endpoint': '/insights/?page_size=20&page=1',
        },
    }

    api_urls.update(pagination_info)

    return Response(api_urls)

@api_view(['GET'])
def insight_list(request):
    paginator = CustomPagination()
    insights = Insight.objects.all()
    paginated_insights = paginator.paginate_queryset(insights, request)
    serializer = InsightSerializer(paginated_insights, many=True)
    return paginator.get_paginated_response(serializer.data)

@api_view(['GET'])
def insight_detail(request, pk):
    insight = Insight.objects.get(id=pk)
    serializer = InsightSerializer(insight, many=False)
    return Response(serializer.data)

@api_view(['POST'])
def insight_create(request):
    serializer = InsightSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
    return Response(serializer.data)

@api_view(['PATCH'])
def insight_update(request, pk):
    insight = Insight.objects.get(id=pk)
    serializer = InsightSerializer(instance=insight, data=request.data, partial=True)
    if serializer.is_valid():
        serializer.save()
    return Response(serializer.data)

@api_view(['DELETE'])
def insight_delete(request, pk):
    insight = Insight.objects.get(id=pk)
    insight.delete()
    return Response("Insight successfully deleted!")
