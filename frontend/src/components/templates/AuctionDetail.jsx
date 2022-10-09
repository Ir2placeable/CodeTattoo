import { faCommentDots } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  AuctionDetailImgBox,
  AuctionDetailInfoBox,
  AuctionDetailInfoItem,
  AuctionDetailMainBox,
  AuctionImg,
  AuctionTagBox,
} from "../../styledComponents";

/** 
 * 상위 컴포넌트 === ShowAuctionDetail.jsx
 * 경매 상세 템플릿
 * @param {Object} detail 경매 상세 데이터 
 */

const AuctionDetail = ({ detail }) => {
  return (
    <>
      <AuctionDetailMainBox>
        <AuctionDetailImgBox>
          <AuctionImg type="detail" src={detail.image} />
        </AuctionDetailImgBox>
        <AuctionDetailInfoBox>
          <AuctionDetailInfoItem>
            <AuctionTagBox type="detail">태그</AuctionTagBox>
            {detail.genre}
          </AuctionDetailInfoItem>
          <AuctionDetailInfoItem>
            <AuctionTagBox type="detail">가격</AuctionTagBox>
            {detail.cost}
          </AuctionDetailInfoItem>

          <AuctionDetailInfoItem>
            <AuctionTagBox type="detail">
              <FontAwesomeIcon icon={faCommentDots} />
            </AuctionTagBox>
            {detail.bidder_count}
          </AuctionDetailInfoItem>
        </AuctionDetailInfoBox>
      </AuctionDetailMainBox>
    </>
  );
};

export default AuctionDetail;
