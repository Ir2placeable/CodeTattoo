import React, { useCallback, useState } from 'react';
import { HeaderBtn, HeaderBtnHover } from '../../../styledComponents';
import { useNavigate } from 'react-router-dom'


const HeaderBtnComp = ({ path, text }) => {
  const [isHover, setIsHover] = useState(false);

  const navigate = useNavigate();
  const onClick = useCallback(() => {
    navigate(`/${path}`)
  }, []);

  return (
    <>
      <HeaderBtn
        style={isHover ? HeaderBtnHover : {}}
        onMouseEnter={() => { setIsHover(true) }}
        onMouseLeave={() => { setIsHover(false) }}
        onClick={onClick}
      >
        {text}
      </HeaderBtn>
    </>
  );
};

export default React.memo(HeaderBtnComp);