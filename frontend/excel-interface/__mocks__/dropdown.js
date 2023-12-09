const React = require ('react');
const DropdownMenu = ({ trigger, child }) => {
    return (
      <div data-testid="mocked-dropdown">
        {trigger}
        {child}
      </div>
    );
  };
  
  module.exports = DropdownMenu;