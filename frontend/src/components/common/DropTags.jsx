import React, { useRef, useState } from 'react';

import {
  DropDownMenu, DropDownDiv, DropDownText, 
  DropDownArrow, ChoiceItem, DropTagsInput,
  DropList, DropItem, XMarkStyle,
  DropTagsDiv, DropTagsText, DropTagsList,
  DropTagsBox, DropTagChoose, TagChooseText,
} from '../../styledComponents';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faAngleDown, faAngleUp, faXmark
} from '@fortawesome/free-solid-svg-icons';

const DropTags = ({ text, data, input, setInput }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isChoice, setIsChoice] = useState(false);
  const [selfInput, setSelfInput] = useState('');
  const selfRef = useRef();

  const onClick = () => {
    setIsOpen(isOpen ? false : true);
  }

  const onChoose = (e) => {
    //setIsOpen(false);
    setIsChoice(true);
    const text = e.target.innerText;

    const dup = input.indexOf(text);
    if(dup !== -1){
      return;
    }

    setInput([
      ...input,
      text
    ]);
  }

  const onChange = (e) => {
    setSelfInput(e.target.value);
  }
  const onKeyUp = (e) => {
    if(e.key === 'Enter'){
      setInput([
        ...input,
        selfInput
      ])
      setSelfInput('');
      selfRef.current.blur();
    }
  }
  const onDelete = (e) => {
    const text = e.target.id;
    setInput(input.filter(data => data !== text));

    if(input.length === 1){
      setIsChoice(false);
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
          <DropTagsDiv>
            <DropTagsBox>
              <DropTagsText>
                KEYWORDS
              </DropTagsText>
              {data.map((_data, idx) => (
                <DropItem key={idx}
                  onMouseEnter={(e) => {e.target.style.backgroundColor = "#BFBCD3"}}
                  onMouseLeave={(e) => {e.target.style.backgroundColor = "#e9e9e9"}}
                  onClick={onChoose}
                  ref={selfRef}
                >
                  {_data.text}
                </DropItem>
              ))}
            </DropTagsBox>

            <DropTagsBox>
              <DropTagsText>
                직접입력
              </DropTagsText>
              <DropTagsInput 
                type="text"
                placeholder='입력 후 Enter'
                value={selfInput}
                onChange={onChange}
                onKeyUp={onKeyUp}
              />
            </DropTagsBox>

            <DropTagsBox style={{borderRight: 'none'}}>
              <DropTagsText>
                Tags
              </DropTagsText>
              
              {input.map((_input, idx) => (
              <DropTagChoose  key={idx}>
                <TagChooseText>
                  {_input}
                </TagChooseText>
                <FontAwesomeIcon icon={faXmark}
                  style={XMarkStyle}
                  id={_input}
                  onClick={onDelete} />
              </DropTagChoose>
              ))}

            </DropTagsBox>
          </DropTagsDiv>
        )}

        { isChoice && (
        <DropTagsList>
          {input.map((_input, idx) => (
            <DropTagChoose key={idx}
              style={{margin: '0 5px 5px'}}>
              <TagChooseText>
                {_input}
              </TagChooseText>
              <FontAwesomeIcon icon={faXmark}
                style={XMarkStyle}
                id={_input}
                onClick={onDelete} />
            </DropTagChoose>
          ))}
        </DropTagsList>
        )}

      </DropDownMenu>
    </>
  );
};

export default DropTags;