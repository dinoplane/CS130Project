/**
 * @module ExcelHandler
 */
export default class ExcelHandler {
    /**
     * A class that makes API calls related to Excel processing to the backend
     * @constructor
     * @property {String} fusekiDispatchUrl the url of the upload/download endpoint
     * @property {String} fusekiKBUrl the url of the Fuseki knowledge base url
     */
    constructor() {
        this.fusekiDispatchUrl =
            'http://0.0.0.0:8000/excel-interface/operations/';
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
     * Downloads an Excel sheet from the backend representing a view of
     * the Fuseki KB based off the selected mappings.
     *
     * @param {Entry[]} entries the selected mapping entries
     * @returns {Excel} an Excel sheet based off selected mappings
     */
    async downloadExcel(entries) {
        var myHeaders = new Headers();
        myHeaders.append('Content-Type', 'application/json');

        const raw = JSON.stringify({
            fuseki_url: this.fusekiKBUrl,
            selected_mappings: entries.map((entry) => {
                return {
                    fuseki_url: this.fusekiKBUrl,
                    id: entry.data.id,
                    name: entry.data.name,
                    query: entry.data.query,
                    date: entry.data.date,
                };
            }),
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow',
        };
        const success = fetch(
            this.fusekiDispatchUrl + 'download',
            requestOptions
        )
            .then((response) => {
                if (response.ok) {
                    return response.blob();
                }
                throw new Error('Something went wrong');
            })
            .then((responseBlob) => {
                const d = new Date();
                let text = d.toTimeString().substring(0, 8);
                const fileName = text + '-excel.xlsx';

                const aElement = document.createElement('a');
                aElement.setAttribute('download', fileName);
                const href = URL.createObjectURL(responseBlob);
                aElement.href = href;
                aElement.setAttribute('target', '_blank');
                aElement.click();
                URL.revokeObjectURL(href);
                return true;
            })
            .catch((error) => {
                console.log(error);
                return false;
            });
        return success;
    }

    /**
     * Uploads an Excel file to the backend to update the
     * knowledge base based on changes made on the Excel sheet.
     *
     * Note the the Excel sheet should be downloaded from the webapp first.
     *
     * @param {Excel} selectedFile a file with the desired modifications to the KB
     * @returns {Boolean} true on success, false otherwise
     */
    async uploadExcel(selectedFile) {
        const formData = new FormData();
        formData.append('file', selectedFile);

        var requestOptions = {
            method: 'POST',
            body: formData,
            redirect: 'follow',
        };

        const success = fetch(this.fusekiDispatchUrl + 'upload', requestOptions)
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
}
