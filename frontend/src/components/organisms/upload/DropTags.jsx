import React, { memo, useState, useRef } from 'react';

import DropNav from './DropNav';
import DropDownItem from '../../atomic/draft_upload/DropDownItem';
import { 
  DropDownMenu, DropTagsBox, DropTagsDiv, DropTagsList 
} from '../../../styledComponents';

import TagList from './TagList';
import TagSelfInput from './TagSelfInput';
import TagChoosed from './TagChoosed';
import TagText from '../../atomic/draft_upload/TagText';
import { useEffect } from 'react';

/** 상위 컴포넌트 === DraftUpload.jsx
 * 도안 등록 페이지 / 주제 드롭다운 메뉴
 * @param {Array} tags 주제 상태 배열
 * @param {Function} setTags tags 상태 함수
 */
const DropTags = memo(({ tags, setTags }) => {
  // 드롭 다운 메뉴 열림 여부
  const [isOpen, setIsOpen] = useState(false);
  // 주제 선택 여부
  const [isChoice, setIsChoice] = useState(false);
   // 직접 입력 상태
  const [selfInput, setSelfInput] = useState('');

  const onChoose = (e) => {
    setIsChoice(true)
    const text = e.target.innerText;

    const dup = tags.indexOf(text);
    if(dup !== -1){
      return;
    }

    if(tags.length > 3){
      alert('주제는 최대 4개까지 선택 가능합니다!')
      return;
    }

    setTags([
      ...tags,
      text
    ])
  }

  const onChange = (e) => {
    setSelfInput(e.target.value);
  }

  const onKeyUp = (e) => {
    if(e.key === 'Enter'){
      setTags([
        ...tags,
        e.target.value
      ])
      setIsChoice(true);
      setSelfInput('');
    }
  }

  const onDelete = (e) => {
    const text = e.target.id;
    setTags(tags.filter(data => data !== text));

    if(tags.length === 1){
      setIsChoice(false);
    }
  }

  useEffect(() => {
    if(tags){
      setIsChoice(true);
      setTags(tags)
    }
  }, [])

  return (
    <>
      <DropDownMenu>

        <DropNav text="주제" isOpen={isOpen} 
          setIsOpen={setIsOpen} />

        { isOpen && (
          <DropTagsDiv>

            <TagList onClick={onChoose} />

            <TagSelfInput selfInput={selfInput}
              onChange={onChange} onKeyUp={onKeyUp}
            />

            <DropTagsBox>
              <TagText text="Tags" />
              <TagChoosed onDelete={onDelete} tags={tags} style={{}} />
            </DropTagsBox>

          </DropTagsDiv>
        )}

        { isChoice && (
          <DropTagsList>
            <TagChoosed onDelete={onDelete} tags={tags} style={{margin: '0 5px 5px'}} />
          </DropTagsList>
        )}

      </DropDownMenu>
    </>
  );
});

export default DropTags;