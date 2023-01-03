import json
from googleapiclient.discovery import build
from google.auth.credentials import Credentials

class ActivityParser:
    def __init__(self, api_key, sheet_id) -> None:
        self.SHEET_ID = sheet_id
        self.API_KEY = api_key

    def get_nonScolarActivities(self):
        return self._get_data("Extra-scolaire - Activités!A1:M50")

    def get_nonScolarEditions(self):
        return self._get_data("Extra-scolaire - Éditions!A1:H200")

    def _convert_table_to_json(self, table):
        data = []
        header = table[0]
        for row in table[1:]:
            row_data = {header[i]: row[i] if i < len(row) else None for i in range(len(header))}
            data.append(row_data)
        return json.dumps(data, ensure_ascii=False)


    # Fonction pour récupérer les données de la feuille de calcul
    def _get_data(self, range_name):
        # Création de l'objet service
        service = build('sheets', 'v4', developerKey=self.API_KEY)

        # Appel de l'API pour récupérer les données
        result = service.spreadsheets().values().get(
            spreadsheetId=self.SHEET_ID, range=range_name).execute()
        values = result.get('values', [],)

        return values

