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

    let tagName = "기타";
    if (auction.genre === "도안요청"){
        tagName = "도안 요청";
    } else if (auction.genre === "커버업") {
        tagName = "커버 업";
    } 

    return (
        <>
        <AuctionBox>
            <AuctionTagBox type={tagName}>{tagName}</AuctionTagBox>
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