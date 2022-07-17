import React from "react";
import useDraftDetail from "../hooks/useDraftDetail";
import { ContentsDiv } from "../styledComponents";

const ShowDrfatDetail = ({ cookies }) => {
  const detail = useDraftDetail(cookies);

  return (
    <>
      <ContentsDiv>

      </ContentsDiv>
    </>
  );
};

export default ShowDrfatDetail;
