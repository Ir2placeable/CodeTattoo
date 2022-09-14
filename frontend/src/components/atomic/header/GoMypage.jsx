import React, { useCallback, useState } from "react";
import { HeaderBtn, HeaderBtnHover } from "../../../styledComponents";
import { getCookie } from "../../../config/cookie";
import { useNavigate } from "react-router-dom";

/** 상위 컴포넌트 === Header.jsx
 * 헤더 / 마이 페이지 이동 버튼 
 */

const GoMypage = () => {
  // Hover Style
  const [isHover, setIsHover] = useState(false);
  const navigate = useNavigate();
  // URL 이동
  const onClick = useCallback(() => {
    if(getCookie('user_id')){
      navigate(`/my-page/user/${getCookie('user_id')}`);
    } else {
      navigate(`/tattooist/${getCookie('tattooist_id')}/draft`);
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
