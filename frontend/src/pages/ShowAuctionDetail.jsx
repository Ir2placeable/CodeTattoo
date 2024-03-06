import {
  AuctionTagBox,
  ContentsDiv,
  HorizontalLine,
  ListDiv,
} from "../styledComponents";
import AuctionDetail from "../components/templates/AuctionDetail";
import useAuctionDetail from "../hooks/useAuctionDetail";
import AuctionBidder from "../components/templates/AuctionBidder";
import Pagination from "../components/organisms/common/Pagination";
import auction from "../dummy/auction";

/* 경매 상세 페이지 */

const ShowAuctionDetail = () => {
  // const auction = useAuctionDetail();

  const detail = {
    auction_id: auction.auction_id,
    creator: auction.creator,
    image: auction.image,
    genre: auction.genre,
    cost: auction.cost,
    bidder_count: auction.bidder_count,
    finished: auction.finished,
  };
  const bidders = auction.bidders;

  return (
    <>
      {/* 경매 상세 */}
      <ContentsDiv>
        <ListDiv>
          <AuctionDetail detail={detail} />
          <HorizontalLine />
          <AuctionBidder
            bidders={bidders}
            auction_id={auction.auction_id}
            user_id={auction.creator}
            finished={auction.finished}
          />
        </ListDiv>
      </ContentsDiv>
    </>
  );
};

export default ShowAuctionDetail;
