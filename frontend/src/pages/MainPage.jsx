import React from "react";
import { MainContentsDiv } from "../styledComponents";

import { Outlet, useLocation } from "react-router-dom";
import Navigation from "../components/organisms/common/Navigation";
import ShowEntry from "./ShowEntry";

const MainPage = () => {
  const location = useLocation();

  return (
    <>

      {location.pathname === '/' ? (
        <ShowEntry />
      ) : (
      <>
        <Navigation />

        <MainContentsDiv>
          <Outlet />
        </MainContentsDiv>
      </>
      )}
      
    </>
  );
};

export default MainPage;
