import React, { useCallback, useState } from "react";
import { HeaderBtn, HeaderBtnHover } from "../../../styledComponents";
import { getCookie } from "../../../config/cookie";
import { goMyPage, goTattooistDetail } from "../../../config/navigate";

/** 상위 컴포넌트 === Header.jsx
 * 헤더 / 마이 페이지 이동 버튼 
 */

const GoMypage = () => {
  // Hover Style
  const [isHover, setIsHover] = useState(false);
  // URL 이동
  const onClick = useCallback(() => {
    if(getCookie('user_id')){
      goMyPage(getCookie('user_id'));
    } else {
      goTattooistDetail(getCookie('tattooist_id'));
    }
  }, []);

  return (
    <>
      <HeaderBtn
        onClick={onClick}
        onMouseEnter={() => {
          setIsHover(true);
        }}
        onMouseLeave={() => {
          setIsHover(false);
        }}
        style={isHover ? HeaderBtnHover : {}}
      >
        마이페이지
      </HeaderBtn>
    </>
  );
};

export default React.memo(GoMypage);
