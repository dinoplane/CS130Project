"""Module providing Fuseki connection tests"""
#get our app from backend
import os
#use pytest
import pytest
from app.main import app
from app.schema.mapping_schema import MappingEntry

#use TestClient
from fastapi.testclient import TestClient

@pytest.fixture
def api_routes():
    """Fixture provided app router url"""
    return {"fuseki_interface":"/excel-interface/operations"}

@pytest.fixture
def fuseki_connec():
    """Fixture provided test Fuseki url"""
    return {"url_1":"http://localhost:3030/db/"}

#tests apply rn when Fuseki server running on "http://localhost:3030/db/"
#do not run until integration testing..
#def test_fuseki_connection(api_routes, fuseki_connec):
    #with TestClient(app) as tester:
        #resp = tester.post(api_routes["fuseki_interface"]+"/check-connection", json={"fuseki_url": fuseki_connec["url_1"]})
        #assert resp.status_code == 200
    #return 
