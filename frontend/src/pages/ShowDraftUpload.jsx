import React, { memo } from 'react';
import DraftUpload from '../components/templates/DraftUpload';
import { ContentsDiv, UploadDiv } from '../styledComponents';

const ShowDraftUpload = memo(() => {
  return (
    <>
    <ContentsDiv>
      <UploadDiv>
        <DraftUpload />
      </UploadDiv>
    </ContentsDiv>
    </>
  );
});

export default ShowDraftUpload;