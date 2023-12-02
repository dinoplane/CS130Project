export default class ExcelHandler {
    constructor() {
        this.fusekiDispatchUrl =
            'http://0.0.0.0:8000/excel-interface/operations/';
        this.fusekiKBUrl = 'http://localhost:3030/db/';
    }

    setFusekiUrl(url) {
        this.fusekiKBUrl = url;
    }

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
                // aElement.setAttribute('href', href);
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
