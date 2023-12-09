import Home from '@/app/page';
import React from 'react';
import { render, fireEvent, waitFor} from '@testing-library/react';
import { act } from 'react-dom/test-utils';


// Mock the MappingManager and ExcelHandler
jest.mock('../src/app/mapping_manager', () => ({
    __esModule: true,
    default: jest.fn(() => ({
      setFusekiUrl: jest.fn(),
      createMapping: jest.fn().mockResolvedValue(true),
        deleteMapping: jest.fn().mockResolvedValue(true),
        requestMapping: jest.fn().mockResolvedValue(false),
    })),
  }));
  jest.mock('../src/app/excelhandler', () => ({
    __esModule: true,
    default: jest.fn(() => ({
      setFusekiUrl: jest.fn(),
    })),
  }));
  
  // Mock the fetch function
  global.fetch = jest.fn(() =>
    Promise.resolve({
      ok: true,
      json: () => Promise.resolve({}),
    })
  );
  
  describe('Home Component', () => {
    it('renders Home component', () => {
      // Render the component
      const { getByText} = render(<Home />);
  
      // Assert on the content or behavior of the Home component
      expect(getByText('Nothing to see here!')).toBeDefined();
    });
  
    it('connects to Fuseki', async () => {
      // Render the component
      const { getByPlaceholderText, getByText, getAllByText} = render(<Home></Home>);

      //click the dropdown
      act(() => {
      fireEvent.click(getByText('Not Connected'));
      })
      expect(getByPlaceholderText('Enter Fuseki Url')).toBeTruthy();
      act(() => {
      // Simulate user input and submit
    fireEvent.change(getByPlaceholderText('Enter Fuseki Url'), {
    target: { value: 'http://example.com' },
    }); 
})

    fireEvent.click(getByText('SUBMIT'));
    await waitFor(() => {
        // Check if the state has been updated or components are rendered as expected
        expect(getAllByText('Connected!')).toBeTruthy();
      });

    });
  });