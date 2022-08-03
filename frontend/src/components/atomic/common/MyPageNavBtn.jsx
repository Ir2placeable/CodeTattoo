import React from "react";

import { MyPageNavigationBtn } from "../../../styledComponents";

// 상위 컴포넌트 == MyPageNav.jsx
const MyPageNavBtn = ({ onClick, text, path }) => {
  return (
    <>
      <MyPageNavigationBtn onClick={onClick} id={path} style={{}}>
        {text}
      </MyPageNavigationBtn>
    </>
  );
};

export default React.memo(MyPageNavBtn);
