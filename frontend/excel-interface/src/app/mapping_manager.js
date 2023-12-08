/**
 * @module MappingManager
 */

/**
 * A class that makes API calls related to mapping manipulation to the backend.
 */
export default class MappingManager {
    /**
     * @constructor
     * @property {String} mappingDbUrl the url of the upload/download endpoint
     * @property {String} fusekiKBUrl the url of the Fuseki knowledge base url
     */
    constructor() {
        this.mappingDbUrl =
            'http://0.0.0.0:8000/excel-interface/mapping-database/';
        this.fusekiKBUrl = '';
    }

    /**
     * Sets the knowledge base url.
     * @param {String} url the url of the Fuseki knowledge base
     */
    setFusekiUrl(url) {
        this.fusekiKBUrl = url;
    }

    /**
     * Creates a mapping entry on the backend with the given name and query.
     * @param {EntryData} entry a mapping entry with only the name and query
     * @returns {Entry} a mapping entry with an id number and date string
     */
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

    /**
     * Deletes the selected mapping entries from the backend.
     * @param {EntryData[]} entries a list of mapping entries to be deleted
     * @returns {Boolean} true on success, false otherwise
     */
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

    /**
     * Fetches mappings from backend for display.
     *
     * @returns {Entry[]} a list of mapping entries for the specific KB
     */
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
        console.log('fetching ' + this.fusekiKBUrl);
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
