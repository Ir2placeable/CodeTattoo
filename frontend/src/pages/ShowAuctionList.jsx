import React, { useState, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import SmallNav from "../components/organisms/common/SmallNav";
import { ContentsDiv, GoUpload } from "../styledComponents";
import Pagination from "../components/organisms/common/Pagination";
import GoUploadBtn from "../components/atomic/draft/GoUploadBtn";
import { getCookie } from "../config/cookie";

/* 경매 목록 페이지 */
const ShowAuctionList = () => {
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState([]);

  const location = useLocation();
  useEffect(() => {
    setPage(1);
  }, [location.pathname]);

  return (
    <>
      {/* 정렬 네비게이션 */}
      <SmallNav
        data={[
          { text: "root", path: "/auctions" },
          { text: "전체", path: "/auctions/all" },
          { text: "커버 업", path: "/auctions/coverup" },
          { text: "도안 요청", path: "/auctions/request" },
        ]}
        isSearch={true}
        loc={1.9}
      />
      {/* 도안 업로드 버튼 */}
      {getCookie("user_id") && <GoUploadBtn type="auction" text="글쓰기" filter="auction" />}

      <ContentsDiv>
        {/* 경매 목록 */}
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

export default ShowAuctionList;
