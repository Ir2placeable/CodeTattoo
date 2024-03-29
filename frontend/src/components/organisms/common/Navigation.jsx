import React, { useCallback } from "react";
import {
  MainNavigation,
  MainNavigationInner,
} from "../../../styledComponents";
import NavigationBtn from "../../atomic/common/NavigationBtn";
import { getCookie } from "../../../config/cookie";
import { useNavigate } from "react-router-dom";

/** 메인 페이지 / 네비게이션바 */

const Navigation = () => {
  const navigate = useNavigate();
  // URL 이동
  const onClick = useCallback((e) => {
    const path = e.target.id;
    if(path === 'drafts' || path === 'tattooists'){
      navigate(`/${path}/best`);
    } else if(path === 'scraps'){
      navigate(`/${path}/draft`);
    } else if(path === 'reservations') {
      navigate(`/${path}/pending`);
    } else if(path === 'auctions') {
      navigate(`/${path}/all`);
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
        <NavigationBtn onClick={onClick} text="경매" path="auctions" />
      </MainNavigationInner>
    </MainNavigation>

    </>
  );
};

export default React.memo(Navigation);
