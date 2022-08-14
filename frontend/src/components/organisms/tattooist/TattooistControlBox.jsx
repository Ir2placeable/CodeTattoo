import React, { useEffect, useState } from "react";
import { useCallback } from "react";
import { getCookie } from "../../../config/cookie";
import useFollowClick from "../../../hooks/useFollowClick";
import { TattooistControl } from "../../../styledComponents";
import TattooistBtn from "../../atomic/tattooist/TattooistBtn";

const TattooistControlBox = ({ tattooist }) => {
  const tattooist_id = tattooist.tattooist_id;
  const [follow, unfollow] = useFollowClick({ tattooist_id });
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

  // reserve 이동 추가해야 함

  return (
    <>
      <TattooistControl>
        <TattooistBtn
          content={following ? "UnFollow" : "Follow"}
          event={onClick}
          size={"medium"}
        />
        <TattooistBtn content={"Reservation"} size={"medium"} />
      </TattooistControl>
    </>
  );
};

export default React.memo(TattooistControlBox);
