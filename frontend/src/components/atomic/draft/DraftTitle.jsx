import React from 'react';
import { DraftImgTitle } from '../../../styledComponents';

const DraftTitle = ({ title }) => {
  return (
    <DraftImgTitle>
      {title}
    </DraftImgTitle>
  );
};

export default React.memo(DraftTitle);