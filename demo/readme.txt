download apache-jena-fuseki-4.10.0

in a terminal window:

cd apache-jena-fuseki-4.10.0   
./fuseki-server --update --mem /db

on browser open localhost:3030
ctrl-c to stop server

parallel terminal (cd directory with scripts), run python demo script using "python3 [scriptname].py"

-----------------------------------------------------------------------------------------------------------------------

Here are the demos:

rdflibquery : Prints out contents of the database using "rdflib" module.

uploadttl2fuseki : Populate an empty Fuseki db with data stored in a ttl(turtle) format file.
                   Uses requests module.

query2excel : Query the database, convert/download the output as an xlsx(excel) file.
                 Uses SPARQLWrapper, openpyxl, io, and csv modules

excel2fuseki : Populate empty Fuseki db with data stored in an excel sheet. Steps include tranforming data to ttl format string.
               Uses SPARQLWrapper, openpyxl, io, csv, and requests modules

-----------------------------------------------------------------------------------------------------------------------

Files :

data.ttl : Stores our db in ttl format
myexcel.xlsx : Stores our data in excel sheet
other.ttl : Extra ttl file for fun