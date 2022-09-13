import React, { useState, useCallback } from "react";
import {
  MainNavigation,
  MainNavigationInner,
  MainNavigationBtnStyle,
} from "../../../styledComponents";
import NavigationBtn from "../../atomic/common/NavigationBtn";
import { getCookie } from "../../../config/cookie";
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect } from "react";

const Navigation = () => {
  const navigate = useNavigate();
  const onClick = useCallback((e) => {
    const path = e.target.id;


    if(path === 'drafts' || path === 'tattooists'){
      navigate(`/${path}/best`);
    } else if(path === 'scraps'){
      navigate(`/${path}/draft`);
    } else if(path === 'reservations') {
      navigate(`/${path}/pending`);
    }
  }, []);

  return (
    <>
      <MainNavigation>
        <MainNavigationInner>
        <NavigationBtn onClick={onClick} text="도안" path="drafts" />
        <NavigationBtn onClick={onClick} text="타투이스트" path="tattooists" />

        { getCookie('user_id') ? (
          <NavigationBtn onClick={onClick} text="스크랩" path="scraps" />
        ) : getCookie('tattooist_id') ? (
          <NavigationBtn onClick={onClick} text="예약 / 작업" path="reservations" />
        ) : (
          <></>
        )}

      </MainNavigationInner>
    </MainNavigation>

    </>
  );
};

export default React.memo(Navigation);
