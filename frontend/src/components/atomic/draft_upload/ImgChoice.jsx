import React from 'react';
import { 
  ImgInputDiv, ImgInput, 
} from '../../../styledComponents';

const ImgChoice = ({onSelectFile}) => {
  return (
    <>
      <ImgInputDiv>
        <ImgInput type="file" onChange={onSelectFile} />
      </ImgInputDiv>
    </>
  );
};

export default React.memo(ImgChoice);