import React from "react";
import { Outlet } from "react-router-dom";
import useDraftDetail from "../hooks/useDraftDetail";
import { ContentsDiv } from "../styledComponents";
import draft from "../dummy/draft";

/* 도안 상세 페이지 */
const ShowDraftDetail = () => {
  // const detail = useDraftDetail();
  return (
    <>
      {/* 도안 상세 */}
      <ContentsDiv>
        <Outlet context={{ detail: draft }} />
      </ContentsDiv>
    </>
  );
};

export default ShowDraftDetail;
