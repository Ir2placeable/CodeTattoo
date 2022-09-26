import React from "react";
import { ContentsDiv } from "../styledComponents";
import { Outlet, useLocation } from "react-router-dom";
import { useState } from "react";
import Pagination from "../components/organisms/common/Pagination";
import SmallNav from "../components/organisms/common/SmallNav";
import { getCookie } from "../config/cookie";
import { useEffect } from "react";

/* 타투이스트 목록 페이지 */
const ShowTattooistList = () => {
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState([]);

  const location = useLocation();
  useEffect(() => {
    setPage(1);
  }, [location.pathname])

  return (
    <>
      {/* 정렬 네비게이션 */}
      <SmallNav
        data={[
          { text: "root", path: "/tattooists" },
          { text: "Best", path: "/tattooists/best" },
          { text: "All", path: "/tattooists/all" },
        ]}
        isSearch={true}
        loc={getCookie("user_id") || getCookie("tattooist_id") ? 1 : 2}
      />

      <ContentsDiv>
        {/* 타투이스트 목록 */}
        <Outlet context={{ page }} />
        {/* 페이지네이션 */}
        <Pagination
          page={page}
          setPage={setPage}
          pages={pages}
          setPages={setPages}
          items={6}
        />
      </ContentsDiv>
    </>
  );
};

export default ShowTattooistList;
