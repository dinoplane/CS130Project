export default class ExcelHandler {
  constructor() {
    this.fusekiDispatchUrl = "1.0.0.0";
    this.connectedFusekiURL = "127.0.0.1";
  }
  async downloadExcel(selectedMappings) {
    const success = fetch(this.fusekiDispatchUrl, {
      method: "GET",
      body: JSON.stringify({
        type: "request",
        fusekiUrl: this.connectedFusekiURL,
        selected: selectedMappings,
      }),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Something went wrong");
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
  async uploadExcel(selectedFile) {
    const formData = new FormData();
    formData.append("File", selectedFile);
    console.log(selectedFile);
    const success = fetch(this.fusekiDispatchUrl, {
      method: "POST",
      body: JSON.stringify({
        fusekiUrl: this.connectedFusekiURL,
        fileName: selectedFile.name,
        fileData: formData,
      }),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Something went wrong");
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
