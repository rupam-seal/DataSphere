import json

with open("jsondata.json", "r", encoding="utf-8") as file:
    data = json.load(file)

sector_counts = {}

# Count occurrences of each sector
for entry in data:
    sector = entry.get("sector", "")
    sector_counts[sector] = sector_counts.get(sector, 0) + 1

# Write sector counts to a single text file
with open("sector_counts.txt", "w") as file:
    for sector, count in sector_counts.items():
        file.write(f"{sector} - {count} \n")
