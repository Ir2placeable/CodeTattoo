import React from "react";
import { TattooistButton } from "../../../styledComponents";

/** 상위 컴포넌트 === SmallTattooist.jsx && TattooistControlBox.jsx
 * 타투이스트 목록 페이지, 타투이스트 상세 페이지 / 타투이스트 팔로우& 예약 버튼 
 * @param {Function} event 팔로우 || URL 이동
 * @param {String} content 버튼 텍스트
 * @param {String} size 버튼 크기 
 * @returns 
 */
const TattooistBtn = ({ event, content, size }) => {
  return (
    <>
      <TattooistButton size={size} onClick={event}>
        {content}
      </TattooistButton>
    </>
  );
};

export default React.memo(TattooistBtn);
