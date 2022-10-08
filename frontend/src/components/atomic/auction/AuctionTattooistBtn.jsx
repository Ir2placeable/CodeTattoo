import { goBidderUpload } from "../../../config/navigate";
import { AuctionBtnBox, AuctionTattooistOption } from "../../../styledComponents";

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