import React, { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import {
  MyPageNavigation,
  MyPageNavigationInner,
} from "../../../styledComponents";
import MyPageNavBtn from "../../atomic/common/MyPageNavBtn";

const MyPageNav = () => {
  const [prev, setPrev] = useState(null);

  const navigate = useNavigate();
  // const onClick = useCallback(
  //   (e) => {
  //     const path = e.target.id;
  //     console.log(path);
  //     if (prev !== null) {
  //       prev.style.color = "rgba(72, 72, 72, .5)";
  //       prev.style.borderBottom = "3px solid white";
  //     }

  //     setPrev(e.target);
  //     e.target.style.color = "black";
  //     e.target.style.borderBottom = "3px solid black";

  //     navigate(`${path}`);
  //   },
  //   [prev]
  // );
  const onClick = useCallback((e) => {
    const path = e.target.id;
    //console.log(path)
    navigate(`${path}`)
  }, [])

  return (
    <>
      <MyPageNavigation>
        <MyPageNavigationInner>
          <MyPageNavBtn onClick={onClick} text="도안" path="draft" />
          <MyPageNavBtn onClick={onClick} text="작업물" path="artwork" />
          <MyPageNavBtn onClick={onClick} text="예약 일정" path="reservation" />
        </MyPageNavigationInner>
      </MyPageNavigation>
    </>
  );
};

export default React.memo(MyPageNav);
