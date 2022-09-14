import React, { useEffect, useState } from 'react';

import { MainNavigationBtn } from '../../../styledComponents';
import { useLocation } from 'react-router-dom';

/** 상위 컴포넌트 === Navigation.jsx
 * 메인 페이지 / 네비게이션 버튼
 * @param {Function} onClick URL 이동
 * @param {String} text 텍스트
 * @param {String} path 경로
 */

const NavigationBtn = ({ onClick, text, path }) => {
  const _style = {
    color: 'black',
    borderBottom: '3px solid black'
  }
  // CSS style 적용
  const [style, setStyle] = useState({});

  const location = useLocation();
  useEffect(() => {
    const [ , _path,  ] = location.pathname.split('/')

    if(_path === path){
      setStyle(_style)
    } else {
      setStyle({})
    }

  }, [location.pathname]);

  return (
    <>
      <MainNavigationBtn
        onClick={onClick}
        id={path}
        style={style}
      >
        {text}
      </MainNavigationBtn>
    </>
  );
};

export default React.memo(NavigationBtn);