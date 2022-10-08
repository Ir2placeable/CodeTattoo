import { ContentsDiv, HorizontalLine, ListDiv } from "../styledComponents";
import AuctionDetail from "../components/templates/AuctionDetail";
import useAuctionDetail from "../hooks/useAuctionDetail";
import AuctionBidder from "../components/templates/AuctionBidder";
import { getCookie } from "../config/cookie";



const ShowAuctionDetail = () => {
  const auction = useAuctionDetail();
  // const detail = {
  //   auction_id: auction.auction_id,
  //   creator: auction.creator,
  //   image: auction.image,
  //   genre: auction.genre,
  //   cost: auction.cost,
  //   bidder_count: auction.bidder_count,
  // };
  // const bidders = auction.bidders;

  const detail = {
    auction_id: 1,
    creator: '유저1',
    image: "https://codetattoo.kr.object.ncloudstorage.com/632325469889c4fba7fd7351",
    genre: '커버 업',
    cost: 300000,
    bidder_count: 4,
  }  

  const bidders = [{
    draft_image: "https://codetattoo.kr.object.ncloudstorage.com/632325469889c4fba7fd7351",
    draft_cost: 290000,
    drawer_id: "13",
    drawer_nickname: "타투이스트1",
    drawer_image: "https://codetattoo.kr.object.ncloudstorage.com/632324de9889c4fba7fd72f2",
    drawer_location: "시흥",
    specialize: "블랙앤그레이",
    isFollowed: false,
  }, {
    draft_image: "https://codetattoo.kr.object.ncloudstorage.com/632325469889c4fba7fd7351",
    draft_cost: 290000,
    drawer_id: "14",
    drawer_nickname: "타투이스트2",
    drawer_image: "https://codetattoo.kr.object.ncloudstorage.com/632324de9889c4fba7fd72f2",
    drawer_location: "시흥",
    specialize: "블랙앤그레이",
    isFollowed: true,
  }]
  return (
    <>
      {/* 경매 상세 */}
      <ContentsDiv>
        <ListDiv>
          <AuctionDetail detail={detail} />
          <HorizontalLine />
          <AuctionBidder bidders={bidders} auction_id={detail.auction_id} user_id={detail.creator}/>
        </ListDiv>
      </ContentsDiv>
    </>
  );
};

export default ShowAuctionDetail;
