import { useOutletContext } from "react-router-dom";
import {
  AuctionMainBox,
  EmptyBox,
  AuctionListDiv,
} from "../../styledComponents";
import Auction from "../organisms/auction/Auction";
import useAuctionList from "../../hooks/useAuctionList";
/**
 * 상위 컴포넌트 === ShowAuction.jsx
 * 경매 목록 템플릿
 * @param {String} filter 전체 / 커버업 / 도안 요청
 */

const AuctionList = ({ filter }) => {
  // 페이지네이션
  const { page } = useOutletContext();

  // 경매 목록 데이터

  // const auctions = useAuctionList({
  //   filter: filter,
  //   page: page,
  // });

  const auctions = [
    {
      auction_id: 1,
      image:
        "https://codetattoo.kr.object.ncloudstorage.com/632324df9889c4fba7fd72f5",
      genre: "도안 요청",
      bidder_count: 11,
      cost: 10000,
    },
    {
      auction_id: 2,
      image:
        "https://codetattoo.kr.object.ncloudstorage.com/632325469889c4fba7fd7351",
      genre: "커버 업",
      bidder_count: 1,
      cost: 20000,
    },
    {
      auction_id: 3,
      image:
        "https://codetattoo.kr.object.ncloudstorage.com/632324b79889c4fba7fd72e0",
      genre: "기타",
      bidder_count: 111,
      cost: 120000,
    },
    {
      auction_id: 4,
      image:
        "https://codetattoo.kr.object.ncloudstorage.com/632324df9889c4fba7fd72f5",
      genre: "커버 업",
      bidder_count: 1111,
      cost: 320000,
    },
    {
      auction_id: 5,
      image:
        "https://codetattoo.kr.object.ncloudstorage.com/632325469889c4fba7fd7351",
      genre: "커버 업",
      bidder_count: 1111,
      cost: 320000,
    },
  ];
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
              <Auction auction={auction} />
            ))}
          </AuctionMainBox>
        )}
      </AuctionListDiv>
    </>
  );
};

export default AuctionList;
