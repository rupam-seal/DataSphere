from django.shortcuts import render
from django.core.paginator import Paginator
from api.models import Insight
from collections import Counter
from datetime import datetime

def get_unique_count(queryset, field_name):
    unique_values = queryset.values_list(field_name, flat=True).distinct()
    return unique_values.count()

def parse_date(date_str):
    try:
        return datetime.strptime(date_str, "%B, %d %Y %H:%M:%S")
    except ValueError:
        return None

# -------- DASHBOARD ---------- #
def dashboard(request):
  insights = Insight.objects.all()
  insights_count = len(insights)

  parsed_dates = [parse_date(insight.published) for insight in insights if parse_date(insight.published) is not None]

  unique_years = set(date.year for date in parsed_dates)
  sorted_years = sorted(unique_years)

  labels = [str(year) for year in sorted_years]
  counts = [sum(1 for date in parsed_dates if date.year == year) for year in sorted_years]

  sector_counts = Counter(insight.sector for insight in insights)

  sector_labels = list(sector_counts.keys())
  sector_counts_data = list(sector_counts.values())

  paginator = Paginator(insights, 100)
  page_number = request.GET.get('page')
  page_obj = paginator.get_page(page_number)

  total_sector_count = get_unique_count(insights, 'sector')
  total_topic_count = get_unique_count(insights, 'topic')
  total_country_count = get_unique_count(insights, 'country')

  context = {
    'page_obj': page_obj,
    'insights': insights,
    'insights_count': insights_count,
    'total_sector_count': total_sector_count,
    "total_topic_count": total_topic_count,
    "total_country_count": total_country_count,
    'navbar': 'dashboard',
    'labels': labels,
    'counts': counts,
    'sector_labels': sector_labels,
    'sector_counts_data': sector_counts_data,
  }
  
  return render(request, 'dashboard.html', context)
