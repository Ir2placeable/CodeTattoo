import React, { memo } from 'react';
import { DropTagsText } from '../../../styledComponents';

/** 상위 컴포넌트 === DropTags.jsx
 * 도안 업로드 페이지 / 선택된 도안 주제 
 * @param {String} text 도안 주제 텍스트
 */
const TagText = memo(({ text }) => {
  return (
    <DropTagsText>
      {text}
    </DropTagsText>
  );
});

export default TagText;