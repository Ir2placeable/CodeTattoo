import React, { memo } from 'react';
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { GoUpload } from '../../../styledComponents';

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