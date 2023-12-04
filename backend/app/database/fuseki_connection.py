"""Module providing a Fuseki Connection class"""
import requests
from fastapi import HTTPException
from SPARQLWrapper import SPARQLWrapper, CSV

class Fuseki:
    """Class representing a Fuseki Connection"""
    @staticmethod
    def is_valid_url(fuseki_url: str):
        """Method checking Fuseki url validity."""
        try:
            # Send a simple HTTP GET request to the Fuseki server
            response = requests.get(fuseki_url, timeout=10)

            # Check if the response status code indicates success
            response.raise_for_status()

            return True

        except requests.RequestException as e:
            print(f"Error connecting to Fuseki: {e}")
            raise HTTPException(status_code=503, detail=f"Fuseki server not available at given url: {fuseki_url}") from e

    @staticmethod
    def get_connection(fuseki_url: str):
        """Method returning Fuseki connection."""
        sparql = SPARQLWrapper(fuseki_url)
        sparql.setReturnFormat(CSV)
        return sparql
