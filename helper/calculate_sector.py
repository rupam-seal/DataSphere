import json

with open("jsondata.json", "r", encoding="utf-8") as file:
    data = json.load(file)

sector_counts = {}

for entry in data:
    sector = entry.get("sector", "")
    sector_counts[sector] = sector_counts.get(sector, 0) + 1

for sector, count in sector_counts.items():
    print(f"{sector} - {count} \n")
