## FILE STRUCTURE

The file structure helps maintain modularity. Please follow the following instruction to add your code

### database

All the code related to making connections to the database goes in here. If you have a new database name the file as provider_connecion.py for example dynamodb_connection.py

If you want to write query for that database such as delete, add then add it to a file as provider.py example dynamodb.py

### services

All service classes go in here, For example ExcelGenerator()

### utils

Functionality which can be reused and is needed by many services goes in here

### schema

For every API request the input and output needs to be sent in a certain format. We specify input schema and output
schema (if needed) to this directory. We use pydantic for generating the input schema. Pydantic makes it easy to check
the input for type and constraints.

### routers

All the endpoints go in here. Do not write much code here other than defining the path, and service call to respective
service in services directory

### exceptions

Write your own exception and handlers here

### models

It nothing but the classes which define the in which pattern we want to put data in database or get
from it. Similar to models in MVC. Use if needed

### tests

Write unit tests for each functionality you develop here. While we are adding workflow to check code coverage with
github actions we recommend to use IDE to calculate the code coverage. Use pylint to check for linting. IMPORTANT!
