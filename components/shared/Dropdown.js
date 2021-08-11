import React, { useState } from 'react';
import { ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

const PortButtonDropdown = (props) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggle = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const renderMenu = (items) => {
    return (
      <DropdownMenu>
        {
          items.map((item) => (
              <DropdownItem key={item.key} {...item.handlers}>{item.text}</DropdownItem>
            )
          )
        }
      </DropdownMenu>
    );
  }

  const { items } = props;

  return (
    <ButtonDropdown className="port-dropdown" isOpen={dropdownOpen} toggle={toggle}>
      <DropdownToggle caret size="sm">
      </DropdownToggle>
      {renderMenu(items)}
    </ButtonDropdown>
  );
  
}

export default PortButtonDropdown;
