import React, { useState } from "react";
import { Outlet, useLocation, useParams } from "react-router-dom";
import { ContentsDiv, ListDiv } from "../styledComponents";
import SmallNav from "../components/organisms/common/SmallNav";
const ShowScrap = () => {
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState([]);

  return (
    <>
      <SmallNav
        data={[
          { text: "root", path: "/scrap" },
          { text: "Draft", path: "/scrap/draft" },
          { text: "Tattooist", path: "/scrap/tattooist" },
        ]}
        isSearch={false}
        location={2}
      />

      <ContentsDiv>
        <Outlet />
      </ContentsDiv>
    </>
  );
};

export default ShowScrap;
