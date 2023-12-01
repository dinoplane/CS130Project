export default class MappingManager {
    constructor() {
        this.mappingDbUrl =
            'http://0.0.0.0:8000/excel-interface/mapping-database/'; // localhost:blabla/excel-interface/mapping-database
        this.fusekiKBUrl = '127.0.0.1';
    }

    setFusekiUrl(url) {
        this.fusekiKBUrl = url;
    }

    async createMapping(entry) {
        let success = true;
        console.log(
            JSON.stringify({
                id: entry.id, // Get rid of this
                name: entry.name,
                query: entry.query,
                date: entry.date, // Get rid of this
            })
        );
        success = fetch(this.mappingDbUrl, {
            method: 'POST',
            headers: {
                accept: ' application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                // fusekiUrl: this.fusekiKBUrl, // Need this
                id: entry.id, // Get rid of this
                name: entry.name,
                query: entry.query,
                date: entry.date, // Get rid of this
            }),
        })
            .then((response) => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error('Something went wrong');
            })
            .then((responseJson) => {
                // Do something with the response
                return true;
            })
            .catch((error) => {
                console.log(error);
                return false;
            });
        // const success = await response.json();
        // console.log(entry);
        // console.log(success);
        console.log(success);
        return success;
    }

    async deleteMapping(entries) {
        let success = fetch(this.mappingDbUrl, {
            method: 'POST',
            body: JSON.stringify({
                // fusekiUrl: this.fusekiKBUrl,
                mappings: entries.map((entry) => {
                    return entry.id;
                }),
            }),
        })
            .then((response) => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error('Something went wrong');
            })
            .then((responseJson) => {
                // Do something with the response
                return true;
            })
            .catch((error) => {
                console.log(error);
                return false;
            });
        return success;
    }

    async requestMapping() {
        return [];
        // const response = await fetch(this.mappingDbUrl, {
        let success = await fetch(this.mappingDbUrl, {
            method: 'POST',
            // body: "",
            body: JSON.stringify({
                fusekiUrl: this.fusekiKBUrl,
            }),
        })
            .then((response) => {
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
