import React, { memo } from 'react';
import { 
  DropDownDiv, DropDownText, DropDownArrow
} from '../../../styledComponents';

import { faAngleUp, faAngleDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const DropNav = memo(({ text, isOpen, setIsOpen }) => {
  const onClick = () => {
    setIsOpen(isOpen ? false : true);
  }
  
  return (
    <>
      <DropDownDiv onClick={onClick}>

        <DropDownText>
          {text}
        </DropDownText>

        <FontAwesomeIcon style={DropDownArrow}
          icon={ isOpen ? faAngleUp : faAngleDown}
         />

      </DropDownDiv>
    </>
  );
});

export default DropNav;