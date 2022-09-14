import React, { useState, useEffect } from "react";
import { SideNavigationBtn } from "../../../styledComponents";
import { useLocation } from "react-router-dom";

/** 상위 컴포넌트 === SideNav.jsx
 * 프로필 편집 페이지 / 네비게이션 버튼
 * @param {Function} onClick 경로
 * @param {String} text 텍스트
 * @param {String} path 경로
 */

const SideNavBtn = ({ onClick, text, path }) => {
  const _style = {
    color: "black",
    borderLeft: "3px solid black",
  };

  const [style, setStyle] = useState({});
  const location = useLocation();
  useEffect(() => {
    const [, , _path] = location.pathname.split("/");
    if (_path === path) {
      setStyle(_style);
    } else {
      setStyle({});
    }
  }, [location.pathname]);
  return (
    <>
      <SideNavigationBtn onClick={onClick} id={path} style={style}>
        {text}
      </SideNavigationBtn>
    </>
  );
};

export default React.memo(SideNavBtn);
