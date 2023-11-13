export default class MappingManager {
  constructor() {
    this.mappingDbUrl = "0.0.0.0";
    this.fusekiDbUrl = "127.0.0.1";
  }

  async createMapping(entry) {
    const response = await fetch(this.mappingDbUrl, {
      method: "POST",
      body: JSON.stringify({type: "create", fusekiUrl: this.fusekiDbUrl, mapping: entry})
    });
    const success = await response.json();
    console.log(mapping);
    return success;
  }

  async deleteMapping(entry) {
    const response = await fetch(this.mappingDbUrl, {
      method: "POST",
      body: JSON.stringify({type: "delete", fusekiUrl: this.fusekiDbUrl, mapping: entry})
    });
    const success = await response.json();
    console.log(mapping);
    return success;
  }

  async requestMapping(b, e) {
    const response = await fetch(this.mappingDbUrl, {
      method: "GET",
      body: JSON.stringify({type: "request", fusekiUrl: this.fusekiDbUrl, begin: b, end: e})
    });
    const mappings = await response.json();
    console.log(mapping);
    return mappings;
  }
}
