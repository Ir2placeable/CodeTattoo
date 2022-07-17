import React, { useState } from "react";
import { Outlet, useLocation, useParams } from "react-router-dom";
import { ContentsDiv, ListDiv } from "../styledComponents";
import useTattooistList from "../hooks/useTattooistList";

import SmallNavigationComp from "../components/main/SmallNavigationComp";

const ShowScrap = ({ cookies }) => {
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState([]);
  const location = useLocation();

  const path = `main${location.pathname}`; // scrap/XXX

  const tattooists = useTattooistList(cookies, path, page);
  const drafts = null;

  return (
    <>
      <SmallNavigationComp
        data={[
          { text: "root", path: "/scrap" },
          { text: "Draft", path: "/scrap/draft" },
          { text: "Tattooist", path: "/scrap/tattooist" },
        ]}
        searchBox={false}
        location={2}
      />

      <ContentsDiv>
        <ListDiv>
          <Outlet tattooists={tattooists} />
        </ListDiv>
      </ContentsDiv>
    </>
  );
};

export default ShowScrap;
