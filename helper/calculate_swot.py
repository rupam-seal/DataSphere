import json

with open('jsondata.json', encoding='utf-8') as f:
    data = json.load(f)

strengths_count = 0
weaknesses_count = 0
opportunities_count = 0
threats_count = 0

for entry in data:
    intensity = int(entry['intensity']) if isinstance(entry['intensity'], str) and entry['intensity'].isdigit() else entry['intensity']
    relevance = int(entry['relevance']) if isinstance(entry['relevance'], str) and entry['relevance'].isdigit() else entry['relevance']
    likelihood = int(entry['likelihood']) if isinstance(entry['likelihood'], str) and entry['likelihood'].isdigit() else entry['likelihood']
    
    if isinstance(intensity, int) and intensity >= 6:
        if isinstance(likelihood, int) and likelihood >= 3:
            strengths_count += 1
        elif isinstance(likelihood, int) and likelihood <= 2:
            weaknesses_count += 1
    if isinstance(relevance, int) and relevance >= 3:
        if isinstance(likelihood, int) and likelihood >= 3:
            opportunities_count += 1
        elif isinstance(likelihood, int) and likelihood <= 2:
            threats_count += 1

print("Strengths:", strengths_count)
print("Weaknesses:", weaknesses_count)
print("Opportunities:", opportunities_count)
print("Threats:", threats_count)
