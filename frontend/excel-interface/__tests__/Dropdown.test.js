import {
    fireEvent,
    render,
} from '@testing-library/react';
import DropdownMenu from '@/app/dropdown';

describe('DropdownMenu', () => {
    test('opens and closes dropdown on trigger click', () => {
      const trigger = <div>Trigger</div>;
      const child = <div>Child Content</div>;
      const { getByText, queryByText } = render(
        <DropdownMenu trigger={trigger} child={child} />
      );
  
      // Dropdown is initially closed
      expect(queryByText('Child Content')).toBeNull();
  
      // Open the dropdown by clicking the trigger
      fireEvent.click(getByText('Trigger'));
  
      // Dropdown should be open now
      expect(queryByText('Child Content')).toBeTruthy();
  
      // Close the dropdown by clicking outside
      fireEvent.click(document);
  
      // Dropdown should be closed
      expect(queryByText('Child Content')).toBeNull();
    });
  });
