import React from "react";
import { useParams } from "react-router-dom";
import { SearchResText } from "../../styledComponents";
import TattooistList from "./TattooistList";

const TattooistSearch = () => {
  const params = useParams();
  const nickname = params.nickname;

  return (
    <>
      <div>
        <SearchResText>'{nickname}'에 대한 검색결과 입니다.</SearchResText>
        <TattooistList filter="tattooists/search" />
      </div>
    </>
  );
};

export default TattooistSearch;
