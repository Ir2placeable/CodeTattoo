import React, { memo } from 'react';
import { DropTagsBox, DropTagsInput } from '../../../styledComponents';
import TagText from '../../atomic/draft_upload/TagText';

const TagSelfInput = memo(({ selfInput, onChange, onKeyUp }) => {
  return (
    <>
      <DropTagsBox>

        <TagText text="직접입력" />

        <DropTagsInput 
          type="text"
          placeholder='입력 후 Enter'
          value={selfInput}
          onChange={onChange}
          onKeyUp={onKeyUp}
        />

      </DropTagsBox>
    </>
  );
});

export default TagSelfInput;