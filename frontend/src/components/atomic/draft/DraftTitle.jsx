import React from 'react';
import { DraftImgTitle } from '../../../styledComponents';

/** 상위 컴포넌트 === Draft.jsx
 * 도안 목록 페이지 / 도안 제목
 * @param {String} title 제목 
 */

const DraftTitle = ({ title }) => {
  return (
    <DraftImgTitle>
      {title}
    </DraftImgTitle>
  );
};

export default React.memo(DraftTitle);