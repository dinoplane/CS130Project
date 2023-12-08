# Excellent Interface Manual

## Introduction

Excel Interface is a webapp that allows users to use Excel sheets to manipulate the data in a Fuseki database.

There are two types of users:

### Mapping Creators

- specify the location of the Fuseki database
- create mappings with a name and a valid SPARQL query
- delete unnecessary mappings

<img width="800" alt="Screenshot 2023-12-08 at 12 38 16 PM" src="https://github.com/dinoplane/CS130Project/assets/93234111/03c5f1f3-b06e-4c79-8f51-4620b901842f">
<br>
<img width="800" alt="Screenshot 2023-12-08 at 12 51 45 PM" src="https://github.com/dinoplane/CS130Project/assets/93234111/e3507eed-98d4-42e0-b91d-a29a6daa85a9">


### Mapping Users

- download an Excel file from a set of selected mappings
- modify and upload the Excel file, whose changes are reflected on the database
<img width="800" alt="Screenshot 2023-12-08 at 12 55 02 PM" src="https://github.com/dinoplane/CS130Project/assets/93234111/71312867-ba25-4b37-88cb-cfa8983b4e57">


## Build Instructions

### provide build instructions here


## Excellent Interface User Guide

### Fuseki DB semantics

- The user must provide a valid DB stored in a Fuseki server
- The subjects and predicates must have the prefix **\<data:/\>**
<img width="400" alt="Screenshot 2023-12-08 at 2 36 36 PM" src="https://github.com/dinoplane/CS130Project/assets/93234111/e95c97ab-31d7-4a44-bfb2-a7b4f34e9a22">


### Connect to Fuseki DB

Before you connect to a server, none of the functionalities will be present.

- Click on "Not Connected"

<img width="400" alt="Screenshot 2023-12-08 at 1 57 00 PM" src="https://github.com/dinoplane/CS130Project/assets/93234111/c4ca557a-aa4c-4703-9e97-ce333ea101ca">
<br>

- Enter the URL to the database in the server
<img width="400" alt="Screenshot 2023-12-08 at 1 57 21 PM" src="https://github.com/dinoplane/CS130Project/assets/93234111/e5c6f231-f207-4a6a-966b-4c2539450df8">
<br>



### Create Mapping

- Click on the **+** button
<img width="400" alt="Screenshot 2023-12-08 at 2 42 08 PM" src="https://github.com/dinoplane/CS130Project/assets/93234111/a0f970ab-a8ac-4dda-b2f5-18f963d8ac63">
<br>

- Enter your SPARQL query and provide a name for your mapping. The query must be in SPARQL, but prefixes must be omitted
<img width="400" alt="Screenshot 2023-12-08 at 2 42 33 PM" src="https://github.com/dinoplane/CS130Project/assets/93234111/9bc94cfd-6018-46c5-827b-8a9a134fde04">
<br>

- After hitting **✔** you should get a success message
<img width="400" alt="Screenshot 2023-12-08 at 2 45 38 PM" src="https://github.com/dinoplane/CS130Project/assets/93234111/8853a464-379f-4454-8fa3-eda75285e380">

### Download Mapping

- Select the mappings you wish to download, and press the download button
<img width="800" alt="Screenshot 2023-12-08 at 2 47 25 PM" src="https://github.com/dinoplane/CS130Project/assets/93234111/1d430e53-9beb-450e-b44a-b630c2224fee">
<br>

- Your downloaded Excel file will contain the mappings you requested. Each mapping is contained in one sheet in the file.
- The file may be named anything, but the **sheet names may not be modified.**
<img width="400" alt="Screenshot 2023-12-08 at 2 52 42 PM" src="https://github.com/dinoplane/CS130Project/assets/93234111/ca3c653d-eb12-46a1-bbf1-9319184d77b0">
<img width="400" alt="Screenshot 2023-12-08 at 2 53 01 PM" src="https://github.com/dinoplane/CS130Project/assets/93234111/e94b1d9c-8b2a-4623-884f-d7075be0d270">


### Upload Mapping

- Uploading a mapping to insert/delete/modify values in the database
- You may **not** modify/add/delete the column headers
- You may **not** modify any of the sheet names
- You may add/delete rows, or modify/delete specific cell values to modify the database
<img width="400" alt="Screenshot 2023-12-08 at 2 59 15 PM" src="https://github.com/dinoplane/CS130Project/assets/93234111/96e52162-a9fc-404a-85c1-eb8112d3f767">
<br>

- Click the upload button and choose the Excel file you wish to upload
<img width="800" alt="Screenshot 2023-12-08 at 3 00 45 PM" src="https://github.com/dinoplane/CS130Project/assets/93234111/caf5a5f9-d595-4e7b-9535-55afedef1d72">
<br>

- The Fuseki DB will automatically update based off the changes made to the excel sheets

### Delete Mappings

- Select the mappings you wish to delete and press the delete symbol
<img width="700" alt="Screenshot 2023-12-08 at 3 03 11 PM" src="https://github.com/dinoplane/CS130Project/assets/93234111/5eaf29ac-7912-4622-bbca-3025d732ffc0">

- Your mappings will be deleted and a success message should show
<img width="400" alt="Screenshot 2023-12-08 at 3 03 55 PM" src="https://github.com/dinoplane/CS130Project/assets/93234111/2804ec3e-885e-4d54-b332-44245148128e">


