import React from "react";
import DraftDetail from "../components/templates/DraftDetail";
import useDraftDetail from "../hooks/useDraftDetail";
import { ContentsDiv, EmptyBox } from "../styledComponents";

const ShowDraftDetail = () => {
  //const detail = useDraftDetail();

  const detail = {
    draft_id: 1,
    image: "",
    title: "도안 1",
    like: 100,
    drawer_id: 101,
    drawer_image: "",
    drawer_nickname: "Sponge Bob",
    drawer_location: "Bikini Bottom",
    genre: "Making Hamberger",
    keywords: [
      { id: 1, content: "Apple" },
      { id: 2, content: "Banana" },
      { id: 3, content: "Cat" },
    ],
    isFollowed: true,
    isScraped: true,
  };
  return (
    <>
      <ContentsDiv>
        {detail.length === 0 ? (
          <EmptyBox>No Tattoo</EmptyBox>
        ) : (
          <DraftDetail detail={detail} />
        )}
      </ContentsDiv>
    </>
  );
};

export default ShowDraftDetail;