import requests

def main():
    data = ""
    headers = {'Content-Type': 'text/turtle;charset=utf-8'}

    #check if the connection is valid or not
    try:
        r = requests.post('http://localhost:3030/db', data=data, headers=headers)
        # tell the user that the connection succeeded
        print("successfull connection")
    except Exception:
        # tell the user that the connectionf failed
        print("no connection")

## main
if __name__ == "__main__":
    main()
    