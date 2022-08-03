import React, { memo } from 'react';
import { LoadedImgText } from '../../../styledComponents';

const ImgText = memo(({ text }) => {
  return (
    <LoadedImgText>
      {text} <span style={{color: 'red'}}>*</span>
    </LoadedImgText>
  );
});

export default ImgText;