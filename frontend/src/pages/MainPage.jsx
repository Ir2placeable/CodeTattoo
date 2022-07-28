import React from "react";
import { MainContentsDiv } from "../styledComponents";

import { Outlet } from "react-router-dom";

const MainPage = () => {
  return (
    <>
      <MainContentsDiv>
        <Outlet />
      </MainContentsDiv>
    </>
  );
};

export default MainPage;
