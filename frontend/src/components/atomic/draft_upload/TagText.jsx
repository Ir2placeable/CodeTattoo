import React, { memo } from 'react';
import { DropTagsText } from '../../../styledComponents';

const TagText = memo(({ text }) => {
  return (
    <DropTagsText>
      {text}
    </DropTagsText>
  );
});

export default TagText;