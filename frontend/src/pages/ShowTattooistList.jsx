import React from "react";
import { ContentsDiv } from "../styledComponents";
import { Outlet } from "react-router-dom";
import { useState } from "react";
import Pagination from "../components/organisms/common/Pagination";
import SmallNav from "../components/organisms/common/SmallNav";
import { getCookie } from "../config/cookie";

/**
 * @file Tattooist Profile List Page
 */

const ShowTattooistList = () => {
  // Pagination State
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState([]);

  return (
    <>
      <SmallNav
        data={[
          { text: "root", path: "/tattooists" },
          { text: "Best", path: "/tattooists/best" },
          { text: "All", path: "/tattooists/all" },
        ]}
        isSearch={true}
        loc={getCookie("user_id") || getCookie("tattooist_id") ? 1 : 2}
      />

      <ContentsDiv>
        <Outlet context={{ page }} />

        <Pagination
          page={page}
          setPage={setPage}
          pages={pages}
          setPages={setPages}
        />
      </ContentsDiv>
    </>
  );
};

export default ShowTattooistList;
