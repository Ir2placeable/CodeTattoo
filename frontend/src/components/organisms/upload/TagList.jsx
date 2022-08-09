import React, { memo } from 'react';
import { 
  DropTagsBox,  
} from '../../../styledComponents';
import TagText from '../../atomic/draft_upload/TagText';
import { keywords } from '../../../data';
import DropDownItem from '../../atomic/draft_upload/DropDownItem';

const TagList = memo(({ onClick }) => {
  return (
    <DropTagsBox>

      <TagText text={"KEYWORDS"} />

      {keywords.map(data => (
        <DropDownItem 
          key={data.name}
          text={data.text}
          onClick={onClick}
        />
      ))}
      
    </DropTagsBox>
  );
});

export default TagList;