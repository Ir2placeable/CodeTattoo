import React from 'react';
import { 
  LoadedImgDescDiv, LoadedImgTitle,
  LoadedImgDesc
} from '../../../styledComponents';
import ImgText from '../../atomic/draft_upload/ImgText';

const UploadDesc = ({ title, description, onChange }) => {
  return (
    <LoadedImgDescDiv>
      <ImgText text={"도안 이름"} />
      <LoadedImgTitle 
        type="text" 
        placeholder='title'
        name="title"
        value={title}
        onChange={onChange}
      />

      {/* 장르 & 주제 */}


      <ImgText text={"도안 설명"} />
      <LoadedImgDesc 
        type="text" 
        placeholder='description'
        name="description"
        value={description}
        onChange={onChange}
      />
    </LoadedImgDescDiv>
  );
};

export default React.memo(UploadDesc);