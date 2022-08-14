import React, { useState } from "react";
import { Outlet, useLocation, useParams } from "react-router-dom";
import { ContentsDiv, ListDiv } from "../styledComponents";
import SmallNav from "../components/organisms/common/SmallNav";
import Pagination from "../components/organisms/common/Pagination";
import useScrapTattooist from "../hooks/useScrapTattooist";
import { useEffect } from "react";
const ShowScrap = () => {
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState([]);

  const [tattooists] = useScrapTattooist({page});

  const location = useLocation();
  useEffect(() => {
    setPage(1);
  }, [location.pathname]);

  return (
    <>
      <SmallNav
        data={[
          { text: "root", path: "/scraps" },
          { text: "Draft", path: "/scraps/draft" },
          { text: "Tattooist", path: "/scraps/tattooist" },
        ]}
        isSearch={false}
        loc={2.3}
      />

      <ContentsDiv>
        <Outlet context={{ page, tattooists }} />

        <Pagination
          page={page} setPage={setPage}
          pages={pages} setPages={setPages}
        />
      </ContentsDiv>
    </>
  );
};

export default ShowScrap;
