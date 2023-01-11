import json
from activities import ActivityParser
from datetime import datetime

from secret import GOOGLE_SHEET_API_KEY, SHEET_ID

fileName = "db.js"

def jsonCode(array):
    js = ap._convert_table_to_json(array)
    js = json.loads(js)
    return json.dumps(js, indent=4, ensure_ascii=False)

def clearFile():
    f = open(fileName, "w")
    f.write("// Generated on " + datetime.now().strftime("%d/%m/%Y %H:%M:%S"))
    f.close()

def writeInFile(content):
    f = open(fileName, "a")
    f.write(content)
    f.close()


ap = ActivityParser(GOOGLE_SHEET_API_KEY, SHEET_ID)

clearFile()

nonScolar_activities = ap.get_nonScolarActivities()

writeInFile("\nconst nonScolarActivities = ")
writeInFile(jsonCode(nonScolar_activities))

nonScolar_editions = ap.get_nonScolarEditions()

writeInFile("\nconst nonScolarEditions = ")
writeInFile(jsonCode(nonScolar_editions))

print("db generated in " + fileName)
