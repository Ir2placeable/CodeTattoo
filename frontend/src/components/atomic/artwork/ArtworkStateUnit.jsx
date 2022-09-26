import React from "react";
import {
  TattooistInfoTitle,
  StateText,
  StateContent,
} from "../../../styledComponents";

/** 상위 컴포넌트 === ArtworkSwiper.jsx, MyTattooSwiper.jsx
 * 작업물 상세 페이지, 유저 마이타투 페이지 / State 정보
 * @param {String} title 
 * @param {String} text 
 * @returns 
 */

const ArtworkStateUnit = ({title, text}) => {
  return (
    <>
      <StateContent>
        <TattooistInfoTitle type="specialize">{title}</TattooistInfoTitle>
        <StateText>{text}</StateText>
      </StateContent>
    </>
  );
};

export default React.memo(ArtworkStateUnit);
