import React, { memo } from 'react';
import { 
  DropTagsBox, DropTagChoose, TagChooseText,
  XMarkStyle
} from '../../../styledComponents';

import TagText from '../../atomic/draft_upload/TagText';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

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