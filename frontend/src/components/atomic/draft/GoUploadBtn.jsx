import React, { memo } from 'react';
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { GoUpload } from '../../../styledComponents';

/** 상위 컴포넌트 === ShowDraftList.jsx
 * 도안 목록 페이지 / 도안 업로드 버튼
 */

const GoUploadBtn = memo(() => {
  const navigate = useNavigate();
  const onClick = useCallback(() => {
    navigate('/upload');
  }, []);

  return (
    <>
      <GoUpload onClick={onClick}>
        도안 등록
      </GoUpload>
    </>
  );
});

export default GoUploadBtn;