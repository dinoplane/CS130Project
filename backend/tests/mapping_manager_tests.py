"""Module providing FastAPI app unit tests"""
import os
#get our app from backend
from app.main import app
from app.schema.mapping_schema import MappingEntry

#use pytest
import pytest
#use TestClient
from fastapi.testclient import TestClient

#use direct connection to Client
from pymongo import MongoClient

@pytest.fixture
def mongo_connec():
    """Fixture providing MongoDB connection configuration variables"""
    return {'db_url': os.getenv('CONNECT_URL'), 'db_name':'mapping_DB', 'c_name':'mappings'}

@pytest.fixture
def api_routes():
    """Fixture providing app router paths"""
    return {"db_ping":"/excel-interface/mapping-database-ping/", "map_db":"/excel-interface/mapping-database/"}

def test_map_db_connection(mongo_connec):
    """Function performing unit test on mongoDB connection"""
    #MongoClient will not throw exception
    test_mongodb_client = MongoClient(mongo_connec['db_url'])
    #Check to see if connection succeeded with server_info
    assert test_mongodb_client.server_info() 

    #Check that 'mapping_DB' database exists 
    assert mongo_connec['db_name'] in test_mongodb_client.list_database_names()

    #Check that "mappings" collection exists in the DB
    test_map_db = test_mongodb_client['mapping_DB']
    assert mongo_connec['c_name'] in test_map_db.list_collection_names()

    #clost test connection
    test_mongodb_client.close()
    return

def test_router_ping(api_routes):
    """Function performing unit test on app ping router"""
    #check app router pink
    with TestClient(app) as tester:
        resp = tester.get(api_routes["db_ping"]+"ping")
        assert resp.status_code == 200
        assert resp.json() == {"ping": "pong"}
    return 

def test_get_mappings(mongo_connec, api_routes):
    """Function performing unit test on mappingBD router fetch endpoint"""
    #test post ("fetch")
    test_connec = MongoClient(mongo_connec['db_url'])
    test_db = test_connec[mongo_connec['db_name']]
    sample_fuseki = {"fuseki_url": "http://localhost:3030/db/"}

    with TestClient(app) as tester:
        #testing rep
        resp = tester.post(api_routes['map_db']+"fetch", json=sample_fuseki,)
        #compare to true db values
        testing_db = test_db[mongo_connec['c_name']].find(sample_fuseki)
        #format the values being tested against without "_id" 
        documents=[{ k:v for k, v in document.items() if k != "_id"} for document in testing_db]

        assert resp.status_code == 200
        #db should be passed back in "result"
        assert resp.json()["result"] == documents
    test_connec.close()
    return 

def test_add_mapping(mongo_connec, api_routes):
    """Function performing unit test on mappingBD router create endpoint"""
    test_connec = MongoClient(mongo_connec['db_url'])
    test_db = test_connec[mongo_connec['db_name']]

    fake_url = "test_url"
    sample_fuseki = {"fuseki_url":fake_url}
    #will test app adding sample_map1
    sample_map1 = {
        "name":"test_add_1",
        "query":"this is a query", 
        "fuseki_url":fake_url,
    }

    with TestClient(app) as tester:
        #compare to original db values
        testing_db = test_db[mongo_connec['c_name']].find(sample_fuseki)
        documents=[{ k:v for k, v in document.items() if k != "_id"} for document in testing_db] #format

        #test resp
        resp = tester.post(api_routes['map_db']+"create", json=sample_map1)
        assert resp.status_code == 201 #succesfully created
        resp_id = resp.json()["id"] #id of added mapping

        #get the object we just added
        db_val = test_db[mongo_connec['c_name']].find_one({"id":resp_id})
        assert db_val!= None #exists
        #add backend generated vals
        db_val.pop("_id")
        sample_map1["id"] = resp_id
        sample_map1["date"] = db_val["date"]
        assert db_val == sample_map1 #equal to what we put in

        #get the resulting database
        updated_db = test_db[mongo_connec['c_name']].find(sample_fuseki)
        updated_documents=[{ k:v for k, v in document.items() if k != "_id"} for document in updated_db]
        #TEST item added correctly
        assert documents+[resp.json()] == updated_documents

        #CLEANUP (needs to be extended to fully clean up if exception occurs)
        db_del = test_db[mongo_connec['c_name']].delete_one({"id":resp_id})
        assert db_del.deleted_count==1
    test_connec.close()
    return 

def test_remove_mapping(mongo_connec, api_routes):
    """Function performing unit test on mappingBD router delete endpoint"""
    test_connec = MongoClient(mongo_connec['db_url'])
    test_db = test_connec[mongo_connec['db_name']]

    #req.app.map_db["mappings"].insert_one(mapping)
    fake_url = "test_url"
    sample_fuseki = {"fuseki_url":fake_url}
    #will test app removing sample_map2
    sample_map2 = dict(MappingEntry(name="test_add_2",query="this is a test query (again)", fuseki_url=fake_url))
    test_id = sample_map2["id"]

    with TestClient(app) as tester:
        #compare to original db values
        testing_db = test_db[mongo_connec['c_name']].find(sample_fuseki)
        documents=[{ k:v for k, v in document.items() if k != "_id"} for document in testing_db] #format

        #add our sample map
        assert test_db[mongo_connec['c_name']].insert_one(sample_map2) != None

        #test resp
        resp = tester.request(method="DELETE", url=api_routes['map_db']+"delete", json={"ids":[test_id]}) #workaround TestClient delete method doesn't take json param
        try:
            assert resp.status_code == 204 #succesfully deleted
        except:
            #CLEANUP OTHERWISE
            db_del = test_db[mongo_connec['c_name']].delete_one({"id":test_id})
            assert db_del.deleted_count==1
            assert resp.status_code == 204 #succesfully deleted

        #try to get the object we just added
        db_val = test_db[mongo_connec['c_name']].find_one({"id":sample_map2["id"]})
        assert db_val== None #does not exist

        #get the resulting database
        updated_db = test_db[mongo_connec['c_name']].find(sample_fuseki)
        updated_documents=[{ k:v for k, v in document.items() if k != "_id"} for document in updated_db]
        #TEST item removed correctly
        assert documents == updated_documents

    test_connec.close()
    return 



