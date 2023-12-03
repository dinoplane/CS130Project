#get our app from backend
from app.main import app
import os
from app.schema.mapping_schema import MappingEntry

#use TestClient
from fastapi.testclient import TestClient
    
#use direct connection to Client
from pymongo import MongoClient

def test_map_db_connection():
    #MongoClient will not throw exception
    test_mongodb_client = MongoClient(os.getenv('CONNECT_URL'))
    #Check to see if connection succeeded with server_info
    assert test_mongodb_client.server_info() 

    #Check that 'mapping_DB' database exists 
    assert "mapping_DB" in test_mongodb_client.list_database_names()

    #Check that "mappings" collection exists in the DB
    test_map_db = test_mongodb_client['mapping_DB']
    assert "mappings" in test_map_db.list_collection_names()

    #clost test connection
    test_mongodb_client.close()
    return

def test_router_ping():
    #check app router pink
    with TestClient(app) as tester:
        resp = tester.get("/excel-interface/mapping-database-ping/ping")
        assert resp.status_code == 200
        assert resp.json() == {"ping": "pong"}
    return 

def test_get_mappings():
    #test post ("fetch")
    test_connec = MongoClient(os.getenv('CONNECT_URL'))
    test_db = test_connec['mapping_DB']
    sample_fuseki = {"fuseki_url": "http://localhost:3030/db/"}

    with TestClient(app) as tester:
        #testing rep
        resp = tester.post("/excel-interface/mapping-database/fetch", json=sample_fuseki,)
        #compare to true db values
        testing_db = test_db["mappings"].find(sample_fuseki)
        #format the values being tested against without "_id" 
        documents=[{ k:v for k, v in document.items() if k != "_id"} for document in testing_db]

        assert resp.status_code == 200
        #db should be passed back in "result"
        assert resp.json()["result"] == documents
    test_connec.close()
    return 

def test_add_mapping():
    test_connec = MongoClient(os.getenv('CONNECT_URL'))
    test_db = test_connec['mapping_DB']

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
        testing_db = test_db["mappings"].find(sample_fuseki)
        documents=[{ k:v for k, v in document.items() if k != "_id"} for document in testing_db] #format

        #test resp
        resp = tester.post("/excel-interface/mapping-database/create", json=sample_map1)
        assert resp.status_code == 201 #succesfully created
        resp_id = resp.json()["id"] #id of added mapping

        #get the object we just added
        db_val = test_db["mappings"].find_one({"id":resp_id})
        assert db_val!= None #exists
        #add backend generated vals
        db_val.pop("_id")
        sample_map1["id"] = resp_id
        sample_map1["date"] = db_val["date"]
        assert db_val == sample_map1 #equal to what we put in

        #get the resulting database
        updated_db = test_db["mappings"].find(sample_fuseki)
        updated_documents=[{ k:v for k, v in document.items() if k != "_id"} for document in updated_db]
        #TEST item added correctly
        assert documents+[resp.json()] == updated_documents

        #CLEANUP (needs to be extended to fully clean up if exception occurs)
        db_del = test_db["mappings"].delete_one({"id":resp_id})
        assert db_del.deleted_count==1
    test_connec.close()
    return 

def test_remove_mapping():
    test_connec = MongoClient(os.getenv('CONNECT_URL'))
    test_db = test_connec['mapping_DB']

    #req.app.map_db["mappings"].insert_one(mapping)
    fake_url = "test_url"
    sample_fuseki = {"fuseki_url":fake_url}
    #will test app removing sample_map2
    sample_map2 = dict(MappingEntry(name="test_add_2",query="this is a test query (again)", fuseki_url=fake_url))
    test_id = sample_map2["id"]

    with TestClient(app) as tester:
        #compare to original db values
        testing_db = test_db["mappings"].find(sample_fuseki)
        documents=[{ k:v for k, v in document.items() if k != "_id"} for document in testing_db] #format

        #add our sample map
        assert test_db["mappings"].insert_one(sample_map2) != None

        #test resp
        resp = tester.request(method="DELETE", url="/excel-interface/mapping-database/delete", json={"ids":[test_id]}) #workaround TestClient delete method doesn't take json param
        try:
            assert resp.status_code == 204 #succesfully deleted
        except:
            #CLEANUP OTHERWISE
            db_del = test_db["mappings"].delete_one({"id":test_id})
            assert db_del.deleted_count==1
            assert resp.status_code == 204 #succesfully deleted

        #try to get the object we just added
        db_val = test_db["mappings"].find_one({"id":sample_map2["id"]})
        assert db_val== None #does not exist

        #get the resulting database
        updated_db = test_db["mappings"].find(sample_fuseki)
        updated_documents=[{ k:v for k, v in document.items() if k != "_id"} for document in updated_db]
        #TEST item removed correctly
        assert documents == updated_documents

    test_connec.close()
    return 



