from api.models import *

from django import forms
from django.forms import ModelForm, TextInput, Select


class InsightForm(ModelForm):
    class Meta:
        model = Insight
        fields = '__all__'

        widgets = {
            'end_year': TextInput(attrs={
                'class': "form__inp",
            }),
            'intensity': TextInput(attrs={
                'class': "form__inp",
            }),
            'sector': TextInput(attrs={
                'class': "form__inp",
            }),
            'topic': TextInput(attrs={
                'class': "form__inp",
            }),
            'insight': TextInput(attrs={
                'class': "form__inp",
            }),
            'url': TextInput(attrs={
                'class': "form__inp",
            }),
            'region': TextInput(attrs={
                'class': "form__inp",
            }),
            'start_year': TextInput(attrs={
                'class': "form__inp",
            }),
            'impact': TextInput(attrs={
                'class': "form__inp",
            }),
            'added': TextInput(attrs={
                'class': "form__inp",
            }),
            'published': TextInput(attrs={
                'class': "form__inp",
            }),
            'country': TextInput(attrs={
                'class': "form__inp",
            }),
            'relevance': TextInput(attrs={
                'class': "form__inp",
            }),
            'pestle': TextInput(attrs={
                'class': "form__inp",
            }),
            'source': TextInput(attrs={
                'class': "form__inp",
            }),
            'title': TextInput(attrs={
                'class': "form__inp",
            }),
            'likelihood': TextInput(attrs={
                'class': "form__inp",
            }),
        }
