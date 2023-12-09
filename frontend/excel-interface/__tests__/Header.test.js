import Header, {ConnectDialog} from '@/app/header';
import React from 'react';
import { render, fireEvent, act} from '@testing-library/react';

jest.mock('../__mocks__/dropdown');

describe('ConnectDialog Component',  () => {
    test('renders ConnectDialog component with input and submit button', async () => {
      const connectCallbackMock = jest.fn();
      connectCallbackMock.mockResolvedValue(true);
      const updateCallbackMock = jest.fn();
      const closeCallbackMock = jest.fn();
  
      const { getByPlaceholderText, getByText } = render(
        <ConnectDialog
          connectCallback={connectCallbackMock}
          updateCallback={updateCallbackMock}
          closecallback={closeCallbackMock}
          startText=""
        />
      );
  
      const inputElement = getByPlaceholderText('Enter Fuseki Url');
      const submitButton = getByText('SUBMIT');
  
      expect(inputElement).toBeTruthy(); // Equivalent to jest-dom's toBeInTheDocument()
      expect(submitButton).toBeTruthy(); // Equivalent to jest-dom's toBeInTheDocument()
  
      // Simulate user input and submit
      fireEvent.change(inputElement, { target: { value: 'http://example.com' } });
      await act(async () => {
      fireEvent.click(submitButton);
      })
      // Check if the callbacks are called with the correct values
      
      expect(connectCallbackMock).toHaveBeenCalledWith('http://example.com');
      expect(updateCallbackMock).toHaveBeenCalledWith('http://example.com');
      expect(closeCallbackMock).toHaveBeenCalled();
    });
  });
  
  describe('Header Component', () => {
    test('renders Header component with title and mocked DropdownMenu', async () => {
      const connectCallbackMock = jest.fn();
      connectCallbackMock.mockResolvedValue(true);

      const { getByPlaceholderText, getByText } = render(<Header connectCallback={connectCallbackMock} />);
  
      expect(getByText('Excellent Interface')).toBeTruthy(); // Equivalent to jest-dom's toBeInTheDocument()

    });
  
  });