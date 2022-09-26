import React, { useCallback, useState } from 'react';
import { HeaderBtn, HeaderBtnHover } from '../../../styledComponents';
import { useNavigate } from 'react-router-dom'

/** 상위 컴포넌트 === Header.jsx
 * 헤더 / 헤더 버튼
 * @param {String} path URL 경로
 * @param {String} text 버튼 텍스트
 */
const HeaderBtnComp = ({ path, text }) => {
  // Hover Style
  const [isHover, setIsHover] = useState(false);
  const navigate = useNavigate();
  // URL 이동
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