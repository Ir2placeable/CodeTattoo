import React, { useState, useCallback } from 'react';
import { 
  MainNavigation, MainNavigationInner,
  MainNavigationBtnStyle
} from '../../../styledComponents';
import NavigationBtn from '../../atomic/common/NavigationBtn';
import { getCookie } from '../../../config/cookie';
import { useNavigate, useLocation } from 'react-router-dom';
import { useEffect } from 'react';

const Navigation = () => {
  const navigate = useNavigate();
  const onClick = useCallback((e) => {
    const path = e.target.id;

    if(path === 'draft' || path === 'tattooist'){
      navigate(`/${path}/best`);
    } else if(path === 'scrap'){
      navigate(`/${path}/draft`);
    }else {
      navigate(`/${path}`);
    }
  }, []);

  return (
    <>
    <MainNavigation>
      <MainNavigationInner>

        <NavigationBtn onClick={onClick} text="도안" path="draft" />
        <NavigationBtn onClick={onClick} text="타투이스트" path="tattooist" />

        { getCookie('user_id') ? (
          <NavigationBtn onClick={onClick} text="스크랩" path="scrap" />
        ) : getCookie('tattooist_id') ? (
          <NavigationBtn onClick={onClick} text="예약" path="reservation" />
        ) : (
          <></>
        )}

      </MainNavigationInner>
    </MainNavigation>
    </>
  );
};

export default React.memo(Navigation);
