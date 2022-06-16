import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { DraftsBtn } from '../styledComponents';

const hoverStyle = {
  color: 'black',
  backgroundColor: 'white',
  border: '3px solid black'
}

const UploadDraftBtn = () => {
  const [isHover, setIsHover] = useState(false);

  const navigate = useNavigate();
  const goDraft = () => {
    navigate('/tattooist/img_load');
  }

  const onHover = () => {
    setIsHover(true);
  }
  const onLeave = () => {
    setIsHover(false)
  }
  return (
    <>
      <DraftsBtn style={isHover ? hoverStyle : {}}
        onClick={goDraft}
        onMouseEnter={onHover}
        onMouseLeave={onLeave}
       >
         도안 등록
       </DraftsBtn>
    </>
  );
};

export default UploadDraftBtn;