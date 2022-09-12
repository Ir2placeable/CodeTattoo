import React, { useCallback, useState } from 'react';
import { HeaderBtn, HeaderBtnHover } from '../../../styledComponents';
import { getAllCookie, resetCookie } from '../../../config/cookie';

const LogoutBtn = () => {
  const [isHover, setIsHover] = useState(false);

  const onClick = useCallback(() => {
    alert('로그아웃 하시겠습니까?')

    const keys = Object.keys(getAllCookie());
    console.log(keys)
    for(let i = 0; i < keys.length; i++){
      resetCookie(keys[i])
    }

    setTimeout(() => {
      window.location.replace('/#')
    }, 1000);
  }, []);

  return (
    <>
      <HeaderBtn
        onClick={onClick}
        onMouseEnter={() => { setIsHover(true) }}
        onMouseLeave={() => { setIsHover(false) }}
        style={isHover ? HeaderBtnHover : {}}
      >
        로그아웃
      </HeaderBtn>
    </>
  );
};

export default React.memo(LogoutBtn);