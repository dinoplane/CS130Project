export default class MappingManager {
  constructor() {
    this.mappingDbUrl = "http://0.0.0.0:8000"; // localhost:blabla/excel-interface/mapping-database
    this.fusekiDbUrl = "127.0.0.1";
  }

  async createMapping(entry) {
    let success = true;
    console.log(
      JSON.stringify({
        type: "create",
        fusekiUrl: this.fusekiDbUrl,
        mapping: entry,
      }),
    );
    success = fetch(this.mappingDbUrl, {
      method: "POST",
      body: JSON.stringify({
        type: "create",
        fusekiUrl: this.fusekiDbUrl,
        mapping: entry,
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
    // const success = await response.json();
    // console.log(entry);
    // console.log(success);
    console.log(success);
    return success;
  }

  async deleteMapping(entry) {
    let success = fetch(this.mappingDbUrl, {
      method: "POST",
      body: JSON.stringify({
        type: "delete",
        fusekiUrl: this.fusekiDbUrl,
        mapping: entry,
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

  async requestMapping() {
    // const response = await fetch(this.mappingDbUrl, {
    //   method: "GET",
    //   body: JSON.stringify({
    //     type: "request",
    //     fusekiUrl: this.fusekiDbUrl,
    //     begin: b,
    //     end: e,
    //   }),
    // });
    // const mappings = await response.json();
    // console.log(mapping);
    return [];
  }
}
