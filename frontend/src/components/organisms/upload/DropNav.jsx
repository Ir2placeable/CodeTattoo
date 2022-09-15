import React, { memo } from 'react';
import { 
  DropDownDiv, DropDownText, DropDownArrow
} from '../../../styledComponents';

import { faAngleUp, faAngleDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

/** 상위 컴포넌트 === DropDown.jsx || DropTags.jsx
 * 드롭다운 메뉴 헤더
 * @param {String} text 헤더 텍스트
 * @param {Boolean} isOpen 드롭다운 열림 여부 상태
 * @param {Function} setIsOpen isOpen 상태 함수
 */
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