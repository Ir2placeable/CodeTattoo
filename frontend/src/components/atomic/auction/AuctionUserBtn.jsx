import {
  AuctionBtnBox,
  AuctionUserOption,
} from "../../../styledComponents";

/** 상위 컴포넌트 === AuctionBidder.jsx
 * 경매 상세 페이지 / 경매 낙찰/삭제 버튼
 * @param {Function} onRemove 경매 삭제 API
 * @param {Function} onBidder 경매 낙찰 API 
 */

const AuctionUserBtn = ({onRemove, onBidder}) => {
  return (
    <>
      <AuctionBtnBox>
        <AuctionUserOption type="select" onClick={onBidder}>경매 낙찰</AuctionUserOption>
        <AuctionUserOption type="remove" onClick={onRemove}>경매 삭제</AuctionUserOption>
      </AuctionBtnBox>
    </>
  );
};

export default AuctionUserBtn;
