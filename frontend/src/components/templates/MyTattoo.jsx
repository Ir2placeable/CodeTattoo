import React, {useState} from "react";
import { MyTattooImg, MyTattooStateBox } from "../../styledComponents";
import MyTattooSwiper from "../organisms/MyTattooSwiper";

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
