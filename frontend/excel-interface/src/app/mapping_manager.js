export default class MappingManager {
    constructor() {
        this.mappingDbUrl =
            'http://0.0.0.0:8000/excel-interface/mapping-database/'; // localhost:blabla/excel-interface/mapping-database
        this.fusekiKBUrl = 'http://localhost:3030/db/';
    }

    setFusekiUrl(url) {
        this.fusekiKBUrl = url;
    }

    async createMapping(entry) {
        let success = true;

        success = fetch(this.mappingDbUrl + 'create', {
            method: 'POST',
            headers: {
                accept: ' application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                fuseki_url: this.fusekiKBUrl,
                name: entry.name,
                query: entry.query,
            }),
        })
            .then((response) => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error('Something went wrong');
            })
            .catch((error) => {
                console.log(error);
                return false;
            });
        console.log(success);
        return success;
    }

    async deleteMapping(entries) {
        var myHeaders = new Headers();
        myHeaders.append('Content-Type', 'application/json');

        const raw = JSON.stringify({
            ids: entries.map((entry) => {
                return entry.data.id;
            }),
        });

        var requestOptions = {
            method: 'DELETE',
            headers: myHeaders,
            body: raw,
            redirect: 'follow',
        };

        let success = fetch(this.mappingDbUrl + 'delete', requestOptions)
            .then((response) => {
                if (response.ok) {
                    return true;
                }
                throw new Error('Something went wrong');
            })
            .catch((error) => {
                console.log(error);
                return false;
            });
        return success;
    }

    async requestMapping() {
        var myHeaders = new Headers();
        myHeaders.append('Content-Type', 'application/json');

        var raw = JSON.stringify({
            fuseki_url: this.fusekiKBUrl,
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow',
        };

        let success = await fetch(this.mappingDbUrl + 'fetch', requestOptions)
            .then((response) => {
                console.log(response);
                if (response.ok) {
                    return response.json();
                }
                throw new Error('Something went wrong');
            })
            .then((responseJson) => {
                console.log(responseJson);
                return responseJson;
            })
            .catch((error) => {
                console.log(error);
                return false;
            });
        console.log(success);
        return success;
    }
}
