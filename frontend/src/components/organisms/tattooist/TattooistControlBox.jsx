import axios from "axios";
import React, { useEffect, useState } from "react";
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
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
    if (following) {
      setFollowing(false);
      unfollow();
    } else {
      setFollowing(true);
      follow();
    }
  }, []);

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
