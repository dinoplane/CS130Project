from SPARQLWrapper import SPARQLWrapper, CSV
import requests
from fastapi import HTTPException


class Fuseki:
    @staticmethod
    def is_valid_url(fuseki_url: str):
        try:
            # Send a simple HTTP GET request to the Fuseki server
            response = requests.get(fuseki_url)

            # Check if the response status code indicates success
            response.raise_for_status()

            return True

        except requests.RequestException as e:
            print(f"Error connecting to Fuseki: {e}")
            raise HTTPException(status_code=503, detail=f"Fuseki server not available at given URL")

    @staticmethod
    def get_connection(fuseki_url: str):
        sparql = SPARQLWrapper(fuseki_url)
        sparql.setReturnFormat(CSV)
        return sparql
