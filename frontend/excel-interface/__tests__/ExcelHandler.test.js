import ExcelHandler from '@/app/excelhandler';

// Mock the global fetch function
global.fetch = jest.fn();

// Mock URL object methods
global.URL = {
  createObjectURL: jest.fn(() => 'mocked-url'),
  revokeObjectURL: jest.fn(),
};

describe('ExcelHandler', () => {
  let excelHandler;

  beforeEach(() => {
    // Reset fetch mock before each test
    global.fetch.mockReset();

    // Mock document.createElement and document.dispatchEvent
    document.createElement = jest.fn(() => ({ setAttribute: jest.fn(), click: jest.fn() }));
    document.dispatchEvent = jest.fn();

    excelHandler = new ExcelHandler();
  });

  test('setFusekiUrl sets the fusekiKBUrl property', () => {
    const url = 'http://localhost.com';
    excelHandler.setFusekiUrl(url);
    expect(excelHandler.fusekiKBUrl).toEqual(url);
  });

  test('downloadExcel success', async () => {
    // Mock a successful response for downloadExcel
    global.fetch.mockResolvedValue({
      ok: true,
      blob: jest.fn(() => new Blob(['Mock Excel Data'], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' })),
    });

    const entries = [
      { data: { id: 1, name: 'Example', query: 'SELECT * FROM example', date: '2023-01-01' } },
    ];

    const success = await excelHandler.downloadExcel(entries);

    expect(global.fetch).toHaveBeenCalledWith(
      'http://0.0.0.0:8000/excel-interface/operations/download',
      expect.objectContaining({
        method: 'POST',
        headers: expect.any(Headers),
        body: JSON.stringify({
          fuseki_url: '', 
          selected_mappings: [
            {
              fuseki_url: '',
              id: 1,
              name: 'Example',
              query: 'SELECT * FROM example',
              date: '2023-01-01',
            },
          ],
        }),
      })
    );

    expect(success).toBe(true);
  });

  test('uploadExcel success', async () => {
    // Mock a successful response for uploadExcel
    global.fetch.mockResolvedValueOnce({ ok: true });

    const fakeFile = new File([''], 'fakeFile.xlsx', { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    const result = await excelHandler.uploadExcel(fakeFile);

    expect(global.fetch).toHaveBeenCalledWith(
      'http://0.0.0.0:8000/excel-interface/operations/upload',
      expect.objectContaining({
        method: 'POST',
        body: expect.any(FormData),
      })
    );

    expect(result).toBe(true);
  });

  test('uploadExcel failure', async () => {
    // Mock a failed response for uploadExcel
    global.fetch.mockResolvedValueOnce({ ok: false });

    const fakeFile = new File([''], 'fakeFile.xlsx', { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    const result = await excelHandler.uploadExcel(fakeFile);

    expect(result).toBe(false);
  });
});
