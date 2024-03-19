from django.shortcuts import render, redirect

from api.models import *

from .forms import InsightForm

from django.contrib.auth.decorators import login_required

from api.models import Insight

def create(request):
    insightForm = InsightForm()

    if request.method == 'POST':
        insightForm = InsightForm(request.POST)

        if insightForm.is_valid():
            insightForm.save()
            return redirect('create')

    context = {
        'insightForm': insightForm,
        'navbar': 'create',
    }

    return render(request, 'create.html', context)
