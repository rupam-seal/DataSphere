import json
from collections import defaultdict
from datetime import datetime

# any other attribute as needed "intensity", "likelihood", "relevance"
attribute = "likelihood"

def calculate_attribute(json_data, attribute):
    published_years = set()
    for entry in json_data:
        if entry.get('published'):
            published_date = datetime.strptime(entry['published'], "%B, %d %Y %H:%M:%S")
            published_years.add(published_date.year)
    
    attribute_by_year = {}
    for year in published_years:
        total_attribute = 0
        months_attribute = defaultdict(int)
        for entry in json_data:
            if entry.get('published') and attribute in entry:
                published_date = datetime.strptime(entry['published'], "%B, %d %Y %H:%M:%S")
                if published_date.year == year:
                    attribute_str = str(entry[attribute])
                    if attribute_str.strip():
                        attribute_value = int(attribute_str)
                        total_attribute += attribute_value
                        months_attribute[published_date.strftime("%B")] += attribute_value
        attribute_by_year[year] = {'total_attribute': total_attribute, 'months_attribute': months_attribute}
    
    return attribute_by_year

def calculate_total_attribute_by_month(attribute_data):
    total_attribute_by_month = defaultdict(int)
    for attribute_info in attribute_data.values():
        for month, attribute in attribute_info['months_attribute'].items():
            total_attribute_by_month[month] += attribute
    return total_attribute_by_month

def load_json_data(file_path):
    with open(file_path, 'r', encoding='utf-8') as file:
        return json.load(file)

file_path = 'jsondata.json'
json_data = load_json_data(file_path)

attribute_data = calculate_attribute(json_data, attribute)

for year, attribute_info in sorted(attribute_data.items()):
    print(f"Year: {year}")
    print(f"Total {attribute}: {attribute_info['total_attribute']}")
    print(f"Monthly {attribute}:")
    for month, attribute in sorted(attribute_info['months_attribute'].items()):
        print(f"  {month}: {attribute}")
    print()

total_attribute_by_month = calculate_total_attribute_by_month(attribute_data)
print(f"\nTotal {attribute} for All Years in Each Month:")
for month, attribute in sorted(total_attribute_by_month.items()):
    print(f"{month}: {attribute}")
