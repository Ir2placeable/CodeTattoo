import React, { memo } from 'react';
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { goAuctionUpload, goUpload } from '../../../config/navigate';
import { GoUpload } from '../../../styledComponents';

/** 상위 컴포넌트 === ShowDraftList.jsx
 * 도안 목록 페이지 / 도안 업로드 버튼
 * @param {String} type 버튼 타입
 * @param {String} text 버튼 텍스트
 * @param {String} filter 네비게이션 필터
 */

const GoUploadBtn = memo(({type, text, filter}) => {
  
  // URL 이동
  const onClick = useCallback(() => {
    if (filter === "auction") {
      goAuctionUpload();
    } else if (filter === "draft") {
      goUpload();
    }
  }, []);

  return (
    <>
      <GoUpload onClick={onClick} type={type}>
        {text}
      </GoUpload>
    </>
  );
});

export default GoUploadBtn;