import React from "react";
import { useParams } from "react-router-dom";
import { SearchResText } from "../../styledComponents";
import AuctionList from "./AuctionList";

/**
 * 상위 컴포넌트 === ShowAuction.jsx
 * 경매 목록 템플릿 (검색)
 */

const AuctionSearch = () => {
  const params = useParams();
  const nickname = params.nickname;

  return (
    <>
      <div>
        <SearchResText>'{nickname}'에 대한 검색결과 입니다.</SearchResText>
        <AuctionList filter="auction/search" />
      </div>
    </>
  );
};

export default AuctionSearch;