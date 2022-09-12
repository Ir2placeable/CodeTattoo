import React from "react";
import { MyTattooImg, MyTattooStateBox } from "../../styledComponents";
import MyTattooSwiper from "../organisms/mypage/MyTattooSwiper";

const MyTattoo = ({ tattoo }) => {

  return (
    <>
      {tattoo.image ? (
        <MyTattooImg src={tattoo.image} />
      ) : (
        <MyTattooImg />
      )}
      <MyTattooStateBox>
        <MyTattooSwiper states={tattoo.states} />
      </MyTattooStateBox>
    </>
  );
};

export default React.memo(MyTattoo);
