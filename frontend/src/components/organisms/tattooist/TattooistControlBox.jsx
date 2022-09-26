import React, { useEffect, useState } from "react";
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { getCookie } from "../../../config/cookie";
import useFollowClick from "../../../hooks/useFollowClick";
import { TattooistControl } from "../../../styledComponents";
import TattooistBtn from "../../atomic/tattooist/TattooistBtn";

/** 상위 컴포넌트 === TattooistList.jsx
 * 타투이스트 목록 페이지/ 팔로우, 예약 버튼
 * @param {Object} tattooist 타투이스트 데이터 
 */

const TattooistControlBox = ({ tattooist }) => {
  const tattooist_id = tattooist.tattooist_id;
  // 팔로우 요청, 팔로우 취소 요청 API
  const [follow, unfollow] = useFollowClick({ tattooist_id });
  // 팔로잉 여부
  const [following, setFollowing] = useState(false);

  useEffect(() => {
    if (tattooist.isFollowed) setFollowing(true);
  }, []);

  const onClick = useCallback(() => {
    if (!getCookie("user_id")) {
      alert("팔로우 기능은 유저 로그인 상태에서 가능합니다.");
    } else {
      if (following) {
        setFollowing(false);
        unfollow();
      } else { 
        setFollowing(true);
        follow();
      }
    }
  }, [following]);

  const navigate = useNavigate();
  // 타투이스트 세부 예약 페이지 이동
  const goReservation = () => {
    navigate(`/tattooist/${tattooist_id}/reservation`);
  };

  return (
    <>
      <TattooistControl>
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
