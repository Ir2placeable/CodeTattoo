import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import MyPageProfile from "../components/organisms/mypage/MyPageProfile";
import { 
  ListDiv, MyPageDiv, 
} from "../styledComponents";
import MyPageNav from "../components/organisms/common/MyPageNav";
import useTattooistDetail from "../hooks/useTattooistDetail";

/* 타투이스트 상세 페이지 */
const ShowTattooistDetail = () => {
  const location = useLocation();
  const path = location.pathname; 
  const [profile, items] = useTattooistDetail(path);

  return (
    <>
      <MyPageDiv>
        <ListDiv>
          {/* 타투이스트 프로필 */}
          <MyPageProfile profile={profile} />
          {/* 도안, 작업물, 예약 네비게이션 */}
          <MyPageNav />
          {/* 도안, 작업물, 예약 */}
          <Outlet context={items} />
        </ListDiv>
      </MyPageDiv>
    </>
  );
};

export default ShowTattooistDetail;
