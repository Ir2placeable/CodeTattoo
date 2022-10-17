import { AuctionBox, AuctionCommentBox, AuctionImg, AuctionInfoBox, AuctionTagBox } from "../../../styledComponents";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCommentDots } from "@fortawesome/free-regular-svg-icons";
import { goAuctionDetail } from "../../../config/navigate";

/** 상위 컴포넌트 === AuctionList.jsx
 * 경매 목록 페이지 / 경매
 * @param {Object} auction 경매 데이터 
 */
const Auction = ({auction}) => {
    
    const style = {
        "marginRight" : "5px"
    }
    const goDetail = () => {
        goAuctionDetail(auction.auction_id)
    }
    return (
        <>
        <AuctionBox>
            <AuctionTagBox type={auction.genre}>{auction.genre}</AuctionTagBox>
            <AuctionImg src={auction.image} onClick={goDetail} type="list"/>
            <AuctionInfoBox>
                {auction.cost} 원
            <AuctionCommentBox>
                <FontAwesomeIcon icon={faCommentDots} style={style}/>
                {auction.bidder_count}
            </AuctionCommentBox>
            </AuctionInfoBox>
        </AuctionBox>
        </>
    )
}

export default Auction;