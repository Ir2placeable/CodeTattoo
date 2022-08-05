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

const DropTags = memo(({ tags, setTags }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isChoice, setIsChoice] = useState(false);
  const [selfInput, setSelfInput] = useState('');

  const onChoose = (e) => {
    setIsChoice(true)
    const text = e.target.innerText;

    const dup = tags.indexOf(text);
    if(dup !== -1){
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
        selfInput
      ])
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