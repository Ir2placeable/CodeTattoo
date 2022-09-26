import React, { memo } from 'react';
import { LoadedImgText } from '../../../styledComponents';

/** 상위 컴포넌트 === DraftUpload.jsx
 * 도안 업로드 페이지 / 도안 업로드 타이틀
 * @param {String} text 도안 타이틀
 */
const ImgText = memo(({ text }) => {
  return (
    <LoadedImgText>
      {text} <span style={{color: 'red'}}>*</span>
    </LoadedImgText>
  );
});

export default ImgText;