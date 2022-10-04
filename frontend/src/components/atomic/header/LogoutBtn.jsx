import React, { useCallback, useState } from 'react';
import { HeaderBtn, HeaderBtnHover } from '../../../styledComponents';
import { getAllCookie, resetCookie } from '../../../config/cookie';
import { goEntry } from '../../../config/navigate';

/** 상위 컴포넌트 === Header.jsx
 * 헤더 / 로그아웃 버튼
 * @param {String} path URL 경로
 * @param {String} text 버튼 텍스트
 */

const LogoutBtn = () => {
  // Hover Style
  const [isHover, setIsHover] = useState(false);

  // 로그아웃 
  const onClick = useCallback(() => {
    alert('로그아웃 하시겠습니까?')

    const keys = Object.keys(getAllCookie());
    for(let i = 0; i < keys.length; i++){
      resetCookie(keys[i])
    }

    setTimeout(() => {
      goEntry();
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