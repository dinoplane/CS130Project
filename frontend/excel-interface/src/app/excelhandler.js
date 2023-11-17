export default class ExcelHandler {
    constructor() {
        this.mappingDbUrl = "0.0.0.0";
        this.connectedFusekiURL = "127.0.0.1";
    }
    async downloadExcel(selectedMappings) {
        const response = await fetch(this.mappingDbUrl, {
            method: "GET",
            body: JSON.stringify({type: "request", fusekiUrl:this.connectedFusekiURL,selected:selectedMappings})
        });
        const success = await response.json();
        console.log(success)
        return success;
    }
    async uploadExcel(file) {
        const response = await fetch(this.mappingDbUrl, {
            method: "POST",
            body: JSON.stringify({type: "create", fusekiUrl: this.connectedFusekiURL, mapping: entry})
        });
        const success = await response.json();
        console.log(success)
        return success;
    }
  }
  