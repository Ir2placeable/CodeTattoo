import React, { memo } from 'react';
import DraftUpload from '../components/templates/DraftUpload';
import { ContentsDiv, UploadDiv } from '../styledComponents';

/* 도안 업로드 페이지 */
const ShowDraftUpload = memo(() => {
  return (
    <>
    <ContentsDiv>
      <UploadDiv>
        {/* 도안 업로드 */}
        <DraftUpload />
      </UploadDiv>
    </ContentsDiv>
    </>
  );
});

export default ShowDraftUpload;