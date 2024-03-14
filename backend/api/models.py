from django.db import models

class Insight(models.Model):
    end_year = models.CharField(max_length=255, blank=True, null=True)
    intensity = models.CharField(max_length=255, blank=True, default=0, null=True)
    sector = models.CharField(max_length=255, blank=True, null=True)
    topic = models.CharField(max_length=255, blank=True, null=True)
    insight = models.TextField(blank=True, null=True)  # Changed to TextField
    url = models.TextField(blank=True, null=True)
    region = models.CharField(max_length=255, blank=True, null=True)
    start_year = models.CharField(max_length=255, blank=True, null=True)
    impact = models.CharField(max_length=255, blank=True, null=True)
    added = models.CharField(max_length=255, blank=True, default='January 1, 1970', null=True)
    published = models.CharField(max_length=255, blank=True, default='January 1, 1970', null=True)
    country = models.CharField(max_length=255, blank=True, null=True)
    relevance = models.CharField(max_length=255, blank=True, default=0, null=True)
    pestle = models.CharField(max_length=255, blank=True, null=True)
    source = models.CharField(max_length=255, blank=True, null=True)
    title = models.TextField(blank=True, null=True)  # Changed to TextField
    likelihood = models.CharField(max_length=255, blank=True, default=0, null=True)

    def __str__(self):
        return self.title
