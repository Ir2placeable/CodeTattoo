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
import { useNavigate } from "react-router-dom";

const SmallTattooist = ({ tattooist }) => {
  const tattooist_id = tattooist.drawer_id;
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

  const navigate = useNavigate();
  const goTattooist = () => {
    navigate(`/tattooist/${tattooist.drawer_id}/draft`);
  };

  return (
    <>
      <SmallTattooistProfileBox>
        <div onClick={goTattooist}>
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
        </div>
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
