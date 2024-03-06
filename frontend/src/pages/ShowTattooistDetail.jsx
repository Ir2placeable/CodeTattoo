import React, { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import MyPageProfile from "../components/organisms/mypage/MyPageProfile";
import { ListDiv, MyPageDiv } from "../styledComponents";
import MyPageNav from "../components/organisms/common/MyPageNav";
import useTattooistDetail from "../hooks/useTattooistDetail";
import { profile, drafts, artworks, reservations } from "../dummy/tattooist";

/* 타투이스트 상세 페이지 */
const ShowTattooistDetail = () => {
  const location = useLocation();
  const path = location.pathname;
  const [items, setItems] = useState([]);
  // const [profile, items] = useTattooistDetail(path);

  useEffect(() => {
    const [, , , type] = path.split("/");

    if (type === "draft") {
      setItems(drafts);
    } else if (type === "artwork") {
      setItems(artworks);
    } else {
      setItems(reservations);
    }
  }, [path]);

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
