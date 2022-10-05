import { ContentsDiv, HorizontalLine, ListDiv } from "../styledComponents";
import AuctionDetail from "../components/templates/AuctionDetail";
import useAuctionDetail from "../hooks/useAuctionDetail";
import AuctionBidder from "../components/templates/AuctionBidder";

const ShowAuctionDetail = () => {
  const auction = useAuctionDetail();
  const detail = {
    auction_id: auction.auction_id,
    creator: auction.creator,
    image: auction.image,
    genre: auction.genre,
    cost: auction.cost,
    bidder_count: auction.bidder_count,
  };
  const bidders = auction.bidders;

  return (
    <>
      {/* 경매 상세 */}
      <ContentsDiv>
        <ListDiv>
          <AuctionDetail detail={detail} />
          <HorizontalLine />
          <AuctionBidder bidders={bidders} />
        </ListDiv>
      </ContentsDiv>
    </>
  );
};

export default ShowAuctionDetail;
