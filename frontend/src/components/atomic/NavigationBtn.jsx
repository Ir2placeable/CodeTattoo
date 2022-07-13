import React, { useCallback, useEffect, useState } from 'react';

import { 
  MainNavigationBtn, MainNavigationBtnStyle
} from '../../styledComponents';
import { useNavigate } from 'react-router-dom';

// 상위 컴포넌트 == MainPage.jsx
const NavigationBtn = ({ text, path, pathname}) => {
  const [styled, setStyled] = useState({});

  useEffect(() => {
    if(path === pathname){
      setStyled(MainNavigationBtnStyle);
    } else {
      setStyled({});
    }
  }, [pathname]);
  
  const navigate = useNavigate();
  const onClick = useCallback(() => {
    navigate(`/${path}`);
  }, [path]);

  return (
    <>
      <MainNavigationBtn
        onClick={onClick}
        style={styled}
      >
        {text}
      </MainNavigationBtn>
    </>
  );
};

export default React.memo(NavigationBtn);