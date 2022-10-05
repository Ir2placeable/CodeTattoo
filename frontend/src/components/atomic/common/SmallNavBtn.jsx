import React from 'react';
import { SmallNavigationBtn } from '../../../styledComponents';

/** 상위 컴포넌트 === SmallNav.jsx
 * 타투이스트 목록, 도안 목록 페이지 / 네비게이션 버튼
 * @param {String} path 경로
 * @param {String} text 검색어
 * @param {Function} onClick URL 이동
 * @param {State} setSearch 
 */

const SmallNavBtn = ({ path, text, onClick, toggle }) => {
  
  let style = {}
  if (toggle) {
    style = {
      color: "black",
    }
  }

  return (
    <>
      <SmallNavigationBtn
        id={path}
        onClick={onClick}
        style={style}
      >
        {text}
      </SmallNavigationBtn>
    </>
  );
};

export default React.memo(SmallNavBtn);