from SPARQLWrapper import SPARQLWrapper, CSV
from openpyxl import Workbook
import csv
from io import StringIO

sparql = SPARQLWrapper("http://localhost:3030/db/")

sparql.setReturnFormat(CSV)

sparql.setQuery("""
PREFIX a: <data:/> 

SELECT ?id ?name ?age
WHERE {
  ?id a:AGE 30 .
  ?id a:NAME ?name .
  ?id a:AGE ?age . 
}

"""    
)



ret = sparql.queryAndConvert()
#print(type(ret))
#print(ret)

content = ret.decode()
file = StringIO(content)
csv_data = csv.reader(file, delimiter=",")
print(csv_data)


wb = Workbook()
ws = wb.active
for r, row in enumerate(csv_data, start=1):
  for c, val in enumerate(row, start=1):
    ws.cell(row=r, column=c).value = val
wb.save('downloaded.xlsx')

##we might need to make changes for construct
## also, to convert to xlsx, we need to do a lot of conversions to remove prefix and format
## if we query everything only... for controlled queries it works fine