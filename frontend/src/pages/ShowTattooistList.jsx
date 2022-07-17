import React from "react";
import { ContentsDiv, EmptyBox, ListDiv } from "../styledComponents";
import { Outlet, useParams } from "react-router-dom";
import SmallNavigationComp from "../components/main/SmallNavigationComp";
import Pagination from "../components/common/Pagination";
import useTattooistList from "../hooks/useTattooistList";
import { useLocation } from "react-router-dom";
import { useState } from "react";

const ShowTattooistList = ({ cookies }) => {
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState([]);
  const param = useParams();
  const location = useLocation();

  let path = "";
  if (param.length === 0) {
    path = `main/tattooist/search`;
  } else {
    path = `main${location.pathname}`;
  }
  /*
   * Scrap URL 추가 
   */
  const tattooists = useTattooistList(cookies, path, page);

  console.log(`Show Tattooist List`);
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
        <ListDiv>
          {tattooists.length === 0 ? (
            <EmptyBox>No Tattooist</EmptyBox>
          ) : (
            <Outlet tattooists={tattooists} />
          )}
        </ListDiv>
      </ContentsDiv>

      {/*<Pagination
        filter={filter}
        cookies={cookies}
        page={page}
        setPage={setPage}
        pages={pages}
        setPages={setPages}
      />*/}
    </>
  );
};

export default ShowTattooistList;
