import {
  SmallTattooistProfileBox,
  ProfileImg,
  SmallTattooistInfoBox,
  SmallTattooistNickname,
  SmallTattooistLocation,
  ProfileImgIcon,
} from "../../../styledComponents";
import TattooistBtn from "../../atomic/tattooist/TattooistBtn";
import React, { useState, useEffect, useCallback } from "react";
import { getCookie } from "../../../config/cookie";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import useFollowClick from "../../../hooks/useFollowClick";

const SmallTattooist = ({ tattooist }) => {
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

  return (
    <>
      <SmallTattooistProfileBox>
        {tattooist.drawer_image ? (
          <ProfileImg
            size="tattooist"
            src={tattooist.drawer_image}
            alt={tattooist.drawer_id}
          />
        ) : (
          <ProfileImgIcon size="tattooist">
            <FontAwesomeIcon style={{ fontSize: "80px" }} icon={faUser} />
          </ProfileImgIcon>
        )}

        <SmallTattooistInfoBox>
          <SmallTattooistNickname>
            {tattooist.drawer_nickname}
            <TattooistBtn
              content={following ? "UnFollow" : "Follow"}
              event={onClick}
              size={"small"}
            />
          </SmallTattooistNickname>
          <SmallTattooistLocation>
            {tattooist.drawer_location}
          </SmallTattooistLocation>
        </SmallTattooistInfoBox>
      </SmallTattooistProfileBox>
    </>
  );
};

export default SmallTattooist;
