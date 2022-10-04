import React, { memo, useState } from 'react';
import { 
  DropDownMenu, DropList, ChoiceItem,
  SelfInput
} from '../../../styledComponents';

import DropNav from './DropNav';
import DropDownItem from '../../atomic/draft_upload/DropDownItem';
import { genre } from '../../../data';
import { useRef } from 'react';
import { useEffect } from 'react';

/** 상위 컴포넌트 === DraftUpload.jsx
 * 도안 등록 페이지 / 장르 드롭다운 메뉴
 * @param {String} input 장르 상태
 * @param {Function} setInput input 상태 함수
 */
const DropDown = memo(({ input, setInput }) => {
  // 드롭 다운 메뉴 열림 여부
  const [isOpen, setIsOpen] = useState(false);
  // 장르 선택 여부
  const [isChoice, setIsChoice] = useState(false);
  // 직접 입력 여부
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

  useEffect(() => {
    if(input){
      setIsChoice(true);
    }
  }, [])

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