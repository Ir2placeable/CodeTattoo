import React, { useRef, useState } from 'react';

import {
  DropDownMenu, DropDownDiv, DropDownText, 
  DropDownArrow, ChoiceItem, SelfInput,
  DropList, DropItem
} from '../../styledComponents';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown, faAngleUp } from '@fortawesome/free-solid-svg-icons';

const DropDown = ({ text, data, input, setInput }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isChoice, setIsChoice] = useState(false);
  //const [input, setInput] = useState('');
  const [isSelf, setIsSelf] = useState(false);
  const selfRef = useRef();

  const onClick = () => {
    setIsOpen(isOpen ? false : true);
  }

  const onChoose = (e) => {
    setIsOpen(false);
    setIsChoice(true);
    if(e.target.innerText === '직접입력'){
      setInput('');
      setIsSelf(true);
      return;
    }
    setIsSelf(false);
    setInput(e.target.innerText);
  }

  const onChange = (e) => {
    setInput(e.target.value);
  }
  const onKeyUp = (e) => {
    if(e.key === 'Enter'){
      setIsSelf(false);
      selfRef.current.blur();
    }
  }

  return (
    <>
    <DropDownMenu>
      <DropDownDiv onClick={onClick}>

        <DropDownText>
          {text}
        </DropDownText>

        <FontAwesomeIcon style={DropDownArrow}
          icon={ isOpen ? faAngleUp : faAngleDown} />
      </DropDownDiv>
      { isOpen && (
        <DropList>
          {data.map((_data, idx) => (
            <DropItem key={idx}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = '#BFBCD3'
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = '#e9e9e9'
              }}
              onClick={onChoose}
            >
              {_data.text}
            </DropItem>
          ))}
        </DropList>
      ) }

      { isChoice && !isSelf && (
        <ChoiceItem>
          {input}
        </ChoiceItem>
      )}

      { isChoice && isSelf && (
          <SelfInput
            type="text"
            value={input}
            onChange={onChange}
            placeholder="입력 후 Enter"
            onKeyUp={onKeyUp}
            ref={selfRef}
          />
      )}
    </DropDownMenu>
    </>
  );
};

export default DropDown;