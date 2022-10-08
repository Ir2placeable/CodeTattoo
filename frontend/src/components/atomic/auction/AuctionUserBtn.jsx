import { useState } from "react";
import {
  AuctionBtnBox,
  AuctionUserOption,
} from "../../../styledComponents";

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
