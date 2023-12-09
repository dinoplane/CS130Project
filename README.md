# Excellent Interface

## Introduction

Excel Interface is a webapp that allows users to use Excel sheets to manipulate the data in a Fuseki database.

There are two types of users:

### Mapping Creators

- specify the location of the Fuseki database
- create mappings with a name and a valid SPARQL query
- delete unnecessary mappings

### Mapping Users

- download an Excel sheet from a set of selected mappings
- modify and upload the Excel sheet, whose changes are reflected on the database

## Build/Deploy Instructions

### Frontend

Link to Github Action (CI Script): [here](https://github.com/dinoplane/CS130Project/blob/main/.github/workflows/node.js.yml)

Requirements:

- Node.js `(>= v20.0)`

1. Navigate into the `frontend/excel-interface` directory.

2. Open a terminal and run `npm ci`.

3. Make sure to edit the `BACKEND_URL` environment variable to the url of where the backend is hosted (no `/` at the end).

4. Run `npm run build` to build the app.

5. Run `npm run start` to start the client. It should be running on `localhost:3000`

### Backend


1. Navigate into the `backend` directory.

2. Open a terminal and run `pip install -r requirements.txt`.

3. Navigate into the `backend/app` directory.
4. Mark `backend` as sources root. In terminal execute `export PYTHONPATH="${PYTHONPATH}:your-source/CS130Project/backend"
`
5. Run `uvicorn main:app --reload`
