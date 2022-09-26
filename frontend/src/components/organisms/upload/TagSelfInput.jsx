import React, { memo } from 'react';
import { DropTagsBox, DropTagsInput } from '../../../styledComponents';
import TagText from '../../atomic/draft_upload/TagText';

/** 상위 컴포넌트 === DropTags.jsx
 * 도안 주제 리스트
 * @param {String} selfInput 주제 직접 입력 상태 변수
 * @param {Function} onChange selfInput 변화 감지
 * @param {Function} onKeyUp 입력 키 감지 함수
 */
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
          maxLength={10}
        />

      </DropTagsBox>
    </>
  );
});

export default TagSelfInput;