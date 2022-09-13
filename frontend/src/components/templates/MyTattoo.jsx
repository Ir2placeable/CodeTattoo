import React from "react";
import { MyTattooImg, MyTattooStateBox } from "../../styledComponents";
import MyTattooSwiper from "../organisms/mypage/MyTattooSwiper";

/**
 * 상위 컴포넌트 === ShowMyTattoo.jsx
 * 마이 타투 템플릿
 */
const MyTattoo = ({ tattoo }) => {

  return (
    <>
      {tattoo.image ? <MyTattooImg src={tattoo.image} /> : <MyTattooImg />}
      <MyTattooStateBox>
        <MyTattooSwiper states={tattoo.state} />
      </MyTattooStateBox>
    </>
  );
};

export default React.memo(MyTattoo);
