import { useOutletContext } from "react-router-dom";
import {
  AuctionMainBox,
  EmptyBox,
  AuctionListDiv,
} from "../../styledComponents";
import Auction from "../organisms/auction/Auction";
import useAuctionList from "../../hooks/useAuctionList";

/**
 * 상위 컴포넌트 === ShowAuctionList.jsx
 * 경매 목록 템플릿
 * @param {String} filter 전체 / 커버업 / 도안 요청
 */

const AuctionList = ({ filter }) => {
  // 페이지네이션
  const { page } = useOutletContext();

  // 경매 목록 데이터

  const auctions = useAuctionList({
    filter: filter,
    page: page,
  });

  return (
    <>
      <AuctionListDiv>
        {auctions.length === 0 ? (
          <EmptyBox>
            {filter === "auction/search"
              ? "검색 결과가 없습니다."
              : "아직 글이 없습니다."}
          </EmptyBox>
        ) : (
          <AuctionMainBox>
            {auctions.map((auction) => (
              <Auction key={auction.auction_id} auction={auction} />
            ))}
          </AuctionMainBox>
        )}
      </AuctionListDiv>
    </>
  );
};

export default AuctionList;
