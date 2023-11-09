import requests

data = open('data.ttl').read()
headers = {'Content-Type': 'text/turtle;charset=utf-8'}
r = requests.post('http://localhost:3030/db/data', data=data, headers=headers)