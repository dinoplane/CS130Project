import MappingManager from '@/app/mapping_manager'
// Mock the fetch function
// Mock the fetch function
global.fetch = jest.fn();

describe('MappingManager', () => {
  let mappingManager;

  beforeEach(() => {
    // Reset the module registry before each test
    jest.resetModules();
    mappingManager = new MappingManager();
  });

  it('should set Fuseki URL', () => {
    const url = 'http://example.com';
    mappingManager.setFusekiUrl(url);
    expect(mappingManager.fusekiKBUrl).toBe(url);
  });

  it('should create mapping successfully', async () => {
    const entry = {
      name: 'Test Mapping',
      query: 'SELECT * WHERE { ?s ?p ?o }',
    };
  
    // Mock the successful response for createMapping
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => true,
    });
  
    const success = await mappingManager.createMapping(entry);
    expect(success).toBe(true);
  });

  it('should handle createMapping error', async () => {
    const entry = {
      name: 'Test Mapping',
      query: 'SELECT * WHERE { ?s ?p ?o }',
    };

    // Mock an error response for createMapping
    global.fetch.mockRejectedValueOnce(new Error('Something went wrong'));

    const success = await mappingManager.createMapping(entry);
    expect(success).toBe(false);
  });

  it('should delete mapping successfully', async () => {
    const entries = [
      { data: { id: 1 } },
      { data: { id: 2 } },
      // Add more entries as needed
    ];

    // Mock the successful response for deleteMapping
    global.fetch.mockResolvedValueOnce({
      ok: true,
    });

    const success = await mappingManager.deleteMapping(entries);
    expect(success).toBe(true);
  });

  it('should handle deleteMapping error', async () => {
    const entries = [
      { data: { id: 1 } },
      { data: { id: 2 } },
      // Add more entries as needed
    ];

    // Mock an error response for deleteMapping
    global.fetch.mockRejectedValueOnce(new Error('Something went wrong'));

    const success = await mappingManager.deleteMapping(entries);
    expect(success).toBe(false);
  });

  it('should request mapping successfully', async () => {
    // Mock the successful response for requestMapping
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({}),
    });

    const success = await mappingManager.requestMapping();
    expect(success).toBeTruthy();
  });

  it('should handle requestMapping error', async () => {
    // Mock an error response for requestMapping
    global.fetch.mockRejectedValueOnce(new Error('Something went wrong'));

    const success = await mappingManager.requestMapping();
    expect(success).toBe(false);
  });
});