import React, { memo } from 'react';
import { Outlet } from 'react-router-dom';
import { ContentsDiv, UploadDiv } from '../styledComponents';

/* 도안 업로드 페이지 */
const ShowDraftUpload = memo(() => {
  return (
    <>
    <ContentsDiv>
      <UploadDiv>
        <Outlet/>
      </UploadDiv>
    </ContentsDiv>
    </>
  );
});

export default ShowDraftUpload;