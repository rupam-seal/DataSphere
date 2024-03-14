import json
from tqdm import tqdm
from django.core.management.base import BaseCommand
from api.models import Insight

class Command(BaseCommand):
    help = 'Import insights from a JSON file'

    def add_arguments(self, parser):
        parser.add_argument('json_file_path', type=str, help='Path to the JSON file')

    def handle(self, *args, **options):
        json_file_path = options['json_file_path']
        try:
            with open(json_file_path, 'r', encoding='utf-8') as file:
                insights_data = json.load(file)

            total_insights = len(insights_data)
            with tqdm(total=total_insights, desc='Importing insights', unit='entry') as pbar:
                for insight_data in insights_data:
                    Insight.objects.create(**insight_data)
                    pbar.update(1)

            self.stdout.write(self.style.SUCCESS('Successfully imported insights from JSON.'))
        except Exception as e:
            self.stdout.write(self.style.ERROR(f'Error: {e}'))
