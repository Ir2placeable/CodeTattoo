import React, { useState } from 'react';
import ImgLoad from './ImgLoad';
import ImgList from './ImgList';
import { useNavigate } from 'react-router-dom';

import { 
  DraftsListDiv,
  DraftsBtn,
} from '../styledComponents';

const hoverStyle = {
  color: 'black',
  backgroundColor: 'white',
  border: '3px solid black'
}

const TattoistDrafts = ({ apiUrl }) => {
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
      <DraftsListDiv>
        <DraftsBtn style={isHover ? hoverStyle : {}}
         onClick={goDraft}
         onMouseEnter={onHover}
         onMouseLeave={onLeave}
        >
          도안 등록
        </DraftsBtn>

        {/* <ImgList /> */}
      </DraftsListDiv>
    </>
  );
};

export default TattoistDrafts;