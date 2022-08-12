import React, { useCallback } from "react";
import { SideNavBox } from "../../../styledComponents";
import SideNavBtn from "../../atomic/common/SideNavBtn";
import { useNavigate } from "react-router-dom";
const SideNav = () => {
  const navigate = useNavigate();

  const onClick = useCallback((e) => {
    const path = e.target.id;
    navigate(`/edit/${path}`);
  }, []);

  return (
    <>
      <SideNavBox>
        <SideNavBtn onClick={onClick} text="프로필 편집" path="profile" />
        <SideNavBtn onClick={onClick} text="비밀번호 변경" path="password" />
      </SideNavBox>
    </>
  );
};

export default SideNav;
