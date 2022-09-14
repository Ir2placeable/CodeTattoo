import React from 'react';
import { SmallNavigationBtn } from '../../../styledComponents';

/**
 * 상위 컴포넌트 === SmallNav.jsx
 * 서브 네비게이션 버튼 컴포넌트
 * @param {string} path
 * @param {string} text
 * @param {Function} onClick
 * @param {Function} setStyle
 */
const SmallNavBtn = ({ path, text, onClick, setStyle }) => {

  return (
    <>
      <SmallNavigationBtn
        id={path}
        onClick={onClick}
        style={setStyle(text)}
      >
        {text}
      </SmallNavigationBtn>
    </>
  );
};

export default React.memo(SmallNavBtn);