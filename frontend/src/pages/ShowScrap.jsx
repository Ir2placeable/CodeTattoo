import React, { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { ContentsDiv } from "../styledComponents";
import SmallNav from "../components/organisms/common/SmallNav";
import Pagination from "../components/organisms/common/Pagination";
import useScrapTattooist from "../hooks/useScrapTattooist";
import { useEffect } from "react";

/* 스크랩 페이지 */
const ShowScrap = () => {
  // 현재 페이지 
  const [page, setPage] = useState(1);
  // 전체 페이지 배열
  const [pages, setPages] = useState([]);
  // 스크랩한 타투이스트 목록
  const [tattooists] = useScrapTattooist({page});

  const location = useLocation();
  useEffect(() => {
    setPage(1);
  }, [location.pathname]);

  return (
    <>
      {/* 스크랩 네비게이션 */}
      <SmallNav
        data={[
          { text: "root", path: "/scraps" },
          { text: "Draft", path: "/scraps/draft" },
          { text: "Tattooist", path: "/scraps/tattooist" },
        ]}
        isSearch={false}
        loc={2.3}
      />
      
      {/* 도안 / 타투이스트 */}
      <ContentsDiv>
        <Outlet context={{ page, tattooists }} />
      
      {/* 페이지네이션 */}
        <Pagination
          page={page} setPage={setPage}
          pages={pages} setPages={setPages}
          items={location.pathname === '/scraps/draft' ? 12 : 6}
        />
      </ContentsDiv>
    </>
  );
};

export default ShowScrap;
