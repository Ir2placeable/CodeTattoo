import React from "react";
import { ContentsDiv, EmptyBox, ListDiv } from "../styledComponents";
import { Outlet, useParams } from "react-router-dom";
import useTattooistList from "../hooks/useTattooistList";
import { useLocation } from "react-router-dom";
import { useState } from "react";

import SmallNav from "../components/organisms/common/SmallNav";

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

  // const tattooists = useTattooistList(path, page);

  const tattooists = [
    {
      tattooist_id: 1,
      image: "",
      nickname: "spongebob",
      location: "Bikini Bottom",
      specialize: "making hamberger",
      followers: "1.1K",
      description: "good morning",
      isFollowed: false,
    },
    {
      tattooist_id: 2,
      image: "",
      nickname: "sponge",
      location: "Bikini",
      specialize: "making",
      followers: "2.2K",
      description: "good evening",
      isFollowed: true,
    },
  ];

  console.log(`Show Tattooist List`);
  return (
    <>
      <SmallNav
        data={[
          { text: "root", path: "/tattooist" },
          { text: "Best", path: "/tattooist/best" },
          { text: "All", path: "/tattooist/all" },
        ]}
        isSearch={true}
        loc={2}
      />

      <ContentsDiv>
        <ListDiv>
          {tattooists.length === 0 ? (
            <EmptyBox>No Tattooist</EmptyBox>
          ) : (
            <Outlet context={{ tattooists }} />
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
