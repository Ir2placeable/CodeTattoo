import React from "react";
import { ContentsDiv } from "../../styledComponents";
import { Outlet } from "react-router-dom";
import SmallNavigationComp from "./SmallNavigationComp";

const ShowTattooistList = () => {
  return (
    <>
      <SmallNavigationComp
        data={[
          { text: "root", path: "/tattooist" },
          { text: "Best", path: "/tattooist/best" },
          { text: "All", path: "/tattooist/all" },
        ]}
        searchBox={true}
        location={1}
      />

      <ContentsDiv>
        <Outlet />
      </ContentsDiv>
    </>
  );
};

export default ShowTattooistList;
