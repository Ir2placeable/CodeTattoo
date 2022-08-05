import React, { memo, useState } from 'react';
import { 
  DropDownMenu, DropList, ChoiceItem,
  SelfInput
} from '../../../styledComponents';

import DropNav from './DropNav';
import DropDownItem from '../../atomic/draft_upload/DropDownItem';
import { useCallback } from 'react';
import { genre } from '../../../data';
import { useRef } from 'react';

const DropDown = memo(({ input, setInput }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isChoice, setIsChoice] = useState(false);
  const [isSelf, setIsSelf] = useState(false);
  const selfRef = useRef();

  const onChoose = (e) => {
    setIsOpen(false)
    setIsChoice(true)

    if(e.target.innerText === '직접입력'){
      setIsSelf(true);
      setInput('');
      return;
    }

    setIsSelf(false);
    setInput(e.target.innerText);
  }

  const onKeyUp = (e) => {
    if(e.key === 'Enter'){
      setIsSelf(false);
      selfRef.current.blur()
    }
  }

  return (
    <DropDownMenu>
      
      <DropNav text={"장르"} isOpen={isOpen} setIsOpen={setIsOpen} />

      { isOpen && (
        <DropList>

          {genre.map((data) => (
            <DropDownItem key={data.name}
              text={data.text} onClick={onChoose} />
          ))}

        </DropList>
      )}

      { isChoice && !isSelf && (
        <ChoiceItem>
          {input}
        </ChoiceItem>
      )}

      { isChoice && isSelf && (
        <SelfInput 
          type="text"
          value={input}
          onChange={(e) => {setInput(e.target.value)}}
          placeholder="입력 후 Enter"
          onKeyUp={onKeyUp}
          ref={selfRef}
        />
      )}

    </DropDownMenu>
  );
});

export default DropDown;