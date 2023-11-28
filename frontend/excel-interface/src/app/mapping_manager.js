export default class MappingManager {
  constructor() {
    this.mappingDbUrl = "http://0.0.0.0:8000/excel-interface/mapping-database/"; // localhost:blabla/excel-interface/mapping-database
    this.fusekiDbUrl = "127.0.0.1";
  }

  async createMapping(entry) {
    let success = true;
    console.log(
      JSON.stringify({
        id: entry.id,
        name: entry.name,
        query: entry.query,
        date: entry.date,
      }),
    );
    success = fetch(this.mappingDbUrl, {
      method: "POST",
      headers: {
        accept: " application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: entry.id,
        name: entry.name,
        query: entry.query,
        date: entry.date,
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

  async deleteMapping(entries) {
    let success = fetch(this.mappingDbUrl, {
      method: "POST",
      body: JSON.stringify({
        type: "delete",
        fusekiUrl: this.fusekiDbUrl,
        mappings: entries.map((entry) => {
          return {
            id: entry.id,
            name: entry.name,
            query: entry.query,
            date: entry.date,
          };
        }),
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
    let success = await fetch(this.mappingDbUrl, {
      method: "GET",
      // body: "",
      // body: JSON.stringify({
      //   // fusekiUrl: this.fusekiDbUrl,
      // }),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Something went wrong");
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
