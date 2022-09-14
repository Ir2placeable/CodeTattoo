import React from 'react';
import { DraftImg } from '../../../styledComponents';

/** 상위 컴포넌트 === Draft.jsx
 * 도안 목록 페이지 / 도안 이미지
 * @param {String} src 도안 이미지
 * @param {String} alt 대체 이미지
 * @param {String} id 도안 ID
 * @param {Function} onHover 호버
 */

const DraftImage = ({ src, alt, id, onHover }) => {
  return (
    <>
      <DraftImg 
        src={src}
        alt={alt}
        id={id}
        onMouseEnter={onHover}
      />
    </>
  );
};

export default React.memo(DraftImage);