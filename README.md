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

## Build Instructions

### Frontend

Requirements:

- Node.js `(>= v20.0)`

1. Navigate into the `frontend/excel-interface` directory.

2. Open a terminal and run `npm ci`.

3. Run `npm run dev`.

### Backend
