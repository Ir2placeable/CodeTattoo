import React from "react";
import { Outlet } from "react-router-dom";
import DraftDetail from "../components/templates/DraftDetail";
import useDraftDetail from "../hooks/useDraftDetail";
import { ContentsDiv, EmptyBox } from "../styledComponents";

const ShowDraftDetail = () => {
  const detail = useDraftDetail();
  return (
    <>
      <ContentsDiv>
        <Outlet context={{ detail }} />
      </ContentsDiv>
    </>
  );
};

export default ShowDraftDetail;
