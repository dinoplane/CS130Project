import rdflib
import pandas

g = rdflib.Graph()
g.parse("http://localhost:3030/db/")

for subj, pred, obj in g:
    if (subj, pred, obj) not in g:
       raise Exception("NO DATA")
    
print(g.serialize(format="turtle"))




