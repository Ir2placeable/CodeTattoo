import React from 'react';
import { DraftHeartCount } from '../../../styledComponents';

const DraftLikes = ({ like }) => {
  return (
    <DraftHeartCount>
      {like} likes
    </DraftHeartCount>
  );
};

export default React.memo(DraftLikes);