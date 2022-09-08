import React from "react";
import { MyTattooImg, MyTattooStateBox } from "../../styledComponents";
import MyTattooSwiper from "../organisms/MyTattooSwiper";

const MyTattoo = ({ tattoo }) => {
  return (
    <>
      {tattoo.image ? (
        <MyTattooImg src={tattoo.image} alt={tattoo.tattoo_id} />
      ) : (
        <MyTattooImg />
      )}
      <MyTattooStateBox>
        <MyTattooSwiper states={tattoo.state} />
      </MyTattooStateBox>
    </>
  );
};

export default React.memo(MyTattoo);
