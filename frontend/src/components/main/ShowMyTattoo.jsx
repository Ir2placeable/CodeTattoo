import React from "react";
import { ContentsDiv } from "../../styledComponents";
import { Outlet } from "react-router-dom";

const ShowMyTattoo = () => {
  <>
    <ContentsDiv>
      <Outlet />
    </ContentsDiv>
  </>;
};

export default ShowMyTattoo;
