import React from 'react';
import { DraftHeartCount } from '../../../styledComponents';

/** 상위 컴포넌트 === Draft.jsx
 * 도안 목록 페이지 / 도안 좋아요 수
 * @param {Number} like 도안 좋아요 수
 */
const DraftLikes = ({ like }) => {
  return (
    <DraftHeartCount>
      {like} likes
    </DraftHeartCount>
  );
};

export default React.memo(DraftLikes);