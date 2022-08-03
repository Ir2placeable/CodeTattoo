import React, { useCallback, useEffect, useState } from 'react';

import { MainNavigationBtn } from '../../../styledComponents';
import { useLocation } from 'react-router-dom';

// 상위 컴포넌트 == Navigation.jsx
const NavigationBtn = ({ onClick, text, path }) => {

  const _style = {
    color: 'black',
    borderBottom: '3px solid black'
  }
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