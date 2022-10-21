import React, { useEffect, useState } from "react";
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { getCookie } from "../../../config/cookie";
import { goTattooistReservation } from "../../../config/navigate";
import useFollowClick from "../../../hooks/useFollowClick";
import { TattooistControl } from "../../../styledComponents";
import TattooistBtn from "../../atomic/tattooist/TattooistBtn";

/** 상위 컴포넌트 === TattooistList.jsx
 * 타투이스트 목록 페이지/ 팔로우, 예약 버튼
 * @param {String} type CSS 타입
 * @param {String} id 타투이스트 ID
 * @param {Boolean} isFollowe 팔로우 여부 
 */

const TattooistControlBox = ({ type, id, isFollowed }) => {
  // 팔로우 요청, 팔로우 취소 요청 API
  const [follow, unfollow] = useFollowClick();
  // 팔로잉 여부
  const [following, setFollowing] = useState(false);

  useEffect(() => {
    if (isFollowed) setFollowing(true);
  }, []);

  const onClick = useCallback(() => {
    if (!getCookie("user_id")) {
      alert("팔로우 기능은 유저 로그인 상태에서 가능합니다.");
    } else {
      if (following) {
        setFollowing(false);
        unfollow({ tattooist_id: id });
      } else { 
        setFollowing(true);
        follow({ tattooist_id: id });
      }
    }
  }, [following]);

  // 타투이스트 세부 예약 페이지 이동
  const goReservation = () => {
    goTattooistReservation(id);
  };

  return (
    <>
      <TattooistControl type={type} >
        <TattooistBtn
          content={following ? "UnFollow" : "Follow"}
          event={onClick}
          size={"medium"}
        />
        <TattooistBtn
          content={"Reservation"}
          event={goReservation}
          size={"medium"}
        />
      </TattooistControl>
    </>
  );
};

export default React.memo(TattooistControlBox);
