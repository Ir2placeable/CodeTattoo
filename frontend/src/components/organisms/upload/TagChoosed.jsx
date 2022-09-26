import React, { memo } from 'react';
import { 
  DropTagsBox, DropTagChoose, TagChooseText,
  XMarkStyle
} from '../../../styledComponents';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

/** 상위 컴포넌트 === DropTags.jsx
 * 선택된 도안 주제 컴포넌트
 * @param {Array} tags 선택된 도안 주제
 * @param {Function} onDelete 주제 선택 취소 함수
 * @param {Object} style 스타일
 */
const TagChoosed = memo(({ tags, onDelete, style }) => {
  return (
    <>
      {tags.map((tag, idx) => (
        <DropTagChoose key={idx} style={style}>
          <TagChooseText>{tag}</TagChooseText>
          <FontAwesomeIcon 
            icon={faXmark}
            style={XMarkStyle}
            id={tag}
            onClick={onDelete}
          />
        </DropTagChoose>
      ))}
    </>
  );
});

export default TagChoosed;