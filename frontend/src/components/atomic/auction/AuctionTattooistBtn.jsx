import { goBidderUpload } from "../../../config/navigate";
import { AuctionBtnBox, AuctionTattooistOption } from "../../../styledComponents";

/** 상위 컴포넌트 === AuctionBidder.jsx
 * 경매 상세 페이지 / 경매 응찰 버튼
 * @param {String} auction_id 경매 ID 
 * @returns 
 */
const AuctionTattooistBtn = ({auction_id}) => {
    const goUpload = () => {
        goBidderUpload(auction_id);
    }
    return (
        <>
            <AuctionBtnBox>
                <AuctionTattooistOption onClick={goUpload}>경매 응찰</AuctionTattooistOption>
            </AuctionBtnBox>
        </>
    )
}

export default AuctionTattooistBtn;