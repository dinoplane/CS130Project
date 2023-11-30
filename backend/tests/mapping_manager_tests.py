#get our app from backend
from app.main import app
from app.schema.mapping_schema import MappingEntry

#use TestClient
from fastapi.testclient import TestClient
from fastapi import Request, Response, Body, status

def test_router_ping():
    with TestClient(app) as tester:
        resp = tester.get("/excel-interface/mapping-database-ping/ping")
        assert resp.status_code == 200
        assert resp.json() == {"ping": "pong"}
    return 

def test_get_mappings():
    with TestClient(app) as tester:
        resp = tester.get("/excel-interface/mapping-database/")
        assert resp.status_code == 200
        cur_check = resp.json()
        resp = tester.get("/excel-interface/mapping-database/")
        assert resp.status_code == 200
        assert resp.json() == cur_check
    return 

def test_add_mapping():
    sample_map1 = {
        "id":16,
        "name":"",
        "query":"", 
        "date":"11/29/2023" 
    }
    sample_map2 = {
        "id":17,
        "name":"",
        "query":"", 
        "date":"11/29/2023" 
    }
    #MappingEntry(id=16, name="", query="", date="11/29/2023")
    with TestClient(app) as tester:
        og_resp = tester.get("/excel-interface/mapping-database/")
        assert og_resp.status_code == 200
        resp = tester.post("/excel-interface/mapping-database/", json=sample_map1)
        #check to see that succesfully created
        assert resp.status_code == 201
        #check that correct object was stored
        assert resp.json() == sample_map1
        new_resp = tester.get("/excel-interface/mapping-database/")
        assert og_resp.status_code == 200
        #check that the total contents line up
        assert (og_resp.json() + [resp.json()])==new_resp.json()
    return 
