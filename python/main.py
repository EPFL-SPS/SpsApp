from activities import ActivityParser
from secret import GOOGLE_SHEET_API_KEY, SHEET_ID

ap = ActivityParser(GOOGLE_SHEET_API_KEY, SHEET_ID)

nonScolar_activities = ap.get_nonScolarActivities()

# print(nonScolar_activities)

js = ap._convert_table_to_json(nonScolar_activities)

nonScolar_editions = ap.get_nonScolarEditions()

js = ap._convert_table_to_json(nonScolar_editions)

print(js)

