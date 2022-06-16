import React, { useState } from 'react';

import { SubMenuBtn, HoverBtnStyle } from '../styledComponents';

const Btn = ({ text, onClick }) => {
  const [isHover, setIsHover] = useState(false);

  const onHover = () => {
    setIsHover(true);
  }
  const onLeave = () => {
    setIsHover(false);
  }

  return (
    <>
      <SubMenuBtn style={ isHover ? HoverBtnStyle : {}} 
        onMouseEnter={onHover}
        onMouseLeave={onLeave}
        onClick={onClick}
      >
        {text}
      </SubMenuBtn>
    </>
  );
};

export default Btn;