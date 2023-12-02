export default class ExcelHandler {
    constructor() {
        this.fusekiDispatchUrl = '1.0.0.0';
        this.fusekiKBUrl = '127.0.0.1';
    }

    setFusekiUrl(url) {
        this.fusekiKBUrl = url;
    }

    async downloadExcel(entries) {
        const success = fetch(this.fusekiDispatchUrl, {
            method: 'POST',
            mode: 'no-cors',
            referrerPolicy: 'no-referrer',
            body: JSON.stringify({
                fusekiUrl: this.fusekiKBUrl,
                mappings: entries.map((entry) => {
                    return {
                        id: entry.id,
                        // name: entry.name,
                        query: entry.query,
                        // date: entry.date,
                    };
                }),
            }),
        })
            .then((response) => {
                if (response.ok) {
                    return response.blob();
                }
                throw new Error('Something went wrong');
            })
            .then((responseBlob) =>
                // Do something with the response
                {
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
                }
            )
            .catch((error) => {
                console.log(error);
                return false;
            });
        return success;
    }
    async uploadExcel(selectedFile) {
        const formData = new FormData();
        formData.append('file', selectedFile);
        console.log(selectedFile);
        console.log(formData);

        console.log(formData.get());
        const success = fetch(this.fusekiDispatchUrl, {
            method: 'POST',
            body: JSON.stringify({
                fusekiUrl: this.fusekiKBUrl,
                // fileName: selectedFile.name,
                fileData: formData,
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
}
