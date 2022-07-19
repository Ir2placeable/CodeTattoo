import React, { useCallback, useEffect, useState } from 'react';

import { MainNavigationBtn } from '../../../styledComponents';
import { useNavigate } from 'react-router-dom';

// 상위 컴포넌트 == Navigation.jsx
const NavigationBtn = ({ onClick, text, path }) => {

  return (
    <>
      <MainNavigationBtn
        onClick={onClick}
        id={path}
        style={{}}
      >
        {text}
      </MainNavigationBtn>
    </>
  );
};

export default React.memo(NavigationBtn);