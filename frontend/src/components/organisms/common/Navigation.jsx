import React, { useState, useCallback } from 'react';
import { 
  MainNavigation, MainNavigationInner,
  MainNavigationBtnStyle
} from '../../../styledComponents';
import NavigationBtn from '../../atomic/common/NavigationBtn';
import { getCookie } from '../../../config/cookie';
import { useNavigate } from 'react-router-dom';

const Navigation = () => {
  const [prev, setPrev] = useState(null);

  const navigate = useNavigate();
  const onClick = useCallback((e) => {
    const path = e.target.id;

    if(prev !== null){
      prev.style.color = "rgba(72, 72, 72, .5)";
      prev.style.borderBottom = "3px solid white";
    }

    setPrev(e.target);
    e.target.style.color = "black";
    e.target.style.borderBottom = "3px solid black";

    if(path === 'draft' || path === 'tattooist'){
      navigate(`/${path}/best`);
    } else if(path === 'scrap'){
      navigate(`/${path}/draft`);
    }else {
      navigate(`/${path}`);
    }
  }, [prev]);

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