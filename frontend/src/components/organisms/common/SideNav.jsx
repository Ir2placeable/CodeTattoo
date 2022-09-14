import React, { useCallback } from "react";
import { SideNavBox } from "../../../styledComponents";
import SideNavBtn from "../../atomic/common/SideNavBtn";
import { useNavigate } from "react-router-dom";

/** 프로필 편집 페이지 / 네비게이션바 */

const SideNav = () => {
  const navigate = useNavigate();
  // URL 이동
  const onClick = useCallback((e) => {
    const path = e.target.id;
    navigate(`/edit/${path}`);
  }, []);

  return (
    <>
      <SideNavBox>
        <SideNavBtn onClick={onClick} text="이미지 변경" path="image" />
        <SideNavBtn onClick={onClick} text="프로필 변경" path="profile" />
        <SideNavBtn onClick={onClick} text="비밀번호 변경" path="password" />
        <SideNavBtn onClick={onClick} text="회원 탈퇴" path="delete" />
      </SideNavBox>
    </>
  );
};

export default SideNav;
