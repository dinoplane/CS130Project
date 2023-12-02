from SPARQLWrapper import SPARQLWrapper, CSV


class Fuseki:
    @staticmethod
    def get_connection(fuseki_url: str):
        sparql = SPARQLWrapper(fuseki_url)
        sparql.setReturnFormat(CSV)
        return sparql
