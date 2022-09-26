import React, { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import {
  MyPageNavigation,
  MyPageNavigationInner,
} from "../../../styledComponents";
import MyPageNavBtn from "../../atomic/common/MyPageNavBtn";

/** 타투이스트 상세 페이지/ 네비게이션바 */
const MyPageNav = () => {
  const navigate = useNavigate();
  // URL 이동
  const onClick = useCallback((e) => {
    const path = e.target.id;
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
