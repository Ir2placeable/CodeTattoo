import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useLocation } from "react-router-dom";

import { MyPageNavigationBtn } from "../../../styledComponents";

// 상위 컴포넌트 === MyPageNav.jsx
const MyPageNavBtn = ({ onClick, text, path }) => {
  const _style = {
    color: 'black',
    borderBottom: '3px solid black'
  }
  const [style, setStyle] = useState({});

  const location = useLocation();
  useEffect(() => {

    const _path = location.pathname.split('/')[3];
    if(_path === path){
      setStyle(_style)
    } else {
      setStyle({})
    }

  }, [location.pathname])
  return (
    <>
      <MyPageNavigationBtn onClick={onClick} id={path} style={style}>
        {text}
      </MyPageNavigationBtn>
    </>
  );
};

export default React.memo(MyPageNavBtn);
