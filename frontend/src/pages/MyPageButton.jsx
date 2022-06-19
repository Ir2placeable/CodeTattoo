import React, { useState } from 'react';
import { MyPageBtn, MyPageBtnHoverStyle } from '../styledComponents';


const MyPageButton = ({ text, onClick, icon }) => {
  const [isHover, setIsHover] = useState(false);

  const onHover = () => {
    setIsHover(true);
  }
  const onLeave = () => {
    setIsHover(false);
  }

  return (
    <>
      <MyPageBtn 
        style={isHover ? MyPageBtnHoverStyle : {}}
        onMouseEnter={onHover}
        onMouseLeave={onLeave}
        onClick={onClick}>
          {text}
      </MyPageBtn>
    </>
  );
};

export default MyPageButton;