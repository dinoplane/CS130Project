from SPARQLWrapper import SPARQLWrapper, CSV, SPARQLExceptions

#### code starts here
def main():

    ##replace with user provided url
    fuseki_url = "http://localhost:3030/db/"


    sparql = SPARQLWrapper(fuseki_url)
    sparql.setReturnFormat(CSV)


    ##hardcoded query, replace with user provided query string
    user_provided_query =  """SELECT ?name ?loc
                WHERE {
                    ?subject start-date ?sd .
                    ?subject name ?name .
                    ?subject location ?loc .
                    FILTER(?sd < "2019-01-01")
                }
                LIMIT 25
    """    

    #flatten the query for ease of parsing
    user_provided_query = " ".join(line.strip() for line in user_provided_query.splitlines())


    ## make a copy of that to modify for our logic
    query = user_provided_query

    #check to make sure it is NOT an update query for security reasons, and don't allow construct either
    for unallowed in ['INSERT', 'DELETE', 'LOAD', 'CLEAR', 'CONSTRUCT']:
        if unallowed in query:
            #if is an update query, its not allowed
            #update this behaviour however you like  <------------------------------------!!!!!
            print("query not allowed")
            return


    #### here we take care of the prefix issue
    prefix = 'data:/'
    shorten = "a:"


    predicates = []
    get_predicates_query = "SELECT DISTINCT ?p WHERE {?s ?p ?o}ORDER BY ?p"

    #first we get our predicates
    sparql.setQuery(get_predicates_query)
    ret = sparql.queryAndConvert()
    content = ret.decode()
    predicates = [line.strip() for line in content.splitlines()][1:]
    predicates = [s.replace(prefix, '') for s in predicates]


    # flatten query for ease of parsing
    query = " ".join(line.strip() for line in query.splitlines())

    
    #add prefixes where necessary in query
    for pred in predicates:
        query = query.replace(pred, shorten+pred)
        query = query.replace('?' + shorten, '?')
    
    #and this is our query with all the prefixes added, pure SPARQL
    query = "PREFIX "+ shorten + " <" + prefix + "> " + query





    #We must now find if they SELECT the primary key too in their query
    #If not, we force them to. this is used later when we parse their
    #uploaded excel sheet for upload mapping(and sparql update)

    #first we find what the primary key is called in this query
    #its the first
    try:
        select_index = query.find("SELECT") + 6
        where_index = query.find("WHERE",select_index)
        curly_index = query.find("{", where_index)
        question_index = query.find("?", curly_index)

        #and here's out primary key's alias
        subject_name = query[question_index:].split()[0]

        #now we check if they user requests to display that alias
        #SELECT ?id ?name , ex: ?id is primary here
        chosen_labels = query[select_index:where_index].split()

        #if they don't select primary key, we force them to select it
        if subject_name not in chosen_labels:
            query = query[:select_index] + ' ' + subject_name + query[select_index:]

    except:
        #i dont wanna check all the edge cases for strings so i assume if 
        #we hit an error here the query was bad to begin with
        #again, replace this with whatever behaviour you do for bad queries
        print("bad query formed")
        return
        
    #now lets query the kb and get the excel file
    ret = None
    try:  
        sparql.setQuery(query)
        ret = sparql.queryAndConvert()
    except(SPARQLExceptions.QueryBadFormed):
        # bad query, we must do smth to handle
        # bad query
        print("bad query fored")
        return


## main
if __name__ == "__main__":
    # you want to put the whole program in a try catch block
    # because fuseki might not be set up yet, or might be and invalid link
    try:
        main()
    except:
        #replace this with behaviour below in backend
        # if the program crashes for any reason, show the user
        # an error saying "something went wrong" or
        # "check if fuseki server is still connected"
        print("bad error")


