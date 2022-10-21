import {
  SmallTattooistProfileBox,
  ProfileImg,
  SmallTattooistInfoBox,
  SmallTattooistNickname,
  SmallTattooistLocation,
  ProfileImgIcon,
  TattooistInfoTitle,
  TattooistInfoText,
} from "../../../styledComponents";
import TattooistBtn from "../../atomic/tattooist/TattooistBtn";
import React, { useState, useEffect } from "react";
import { getCookie } from "../../../config/cookie";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import useFollowClick from "../../../hooks/useFollowClick";
import { goTattooistDetail } from "../../../config/navigate";

/** 상위 컴포넌트 === DraftDetail.jsx
 * 도안 상세 페이지 / 타투이스트
 * @param {Object} tattooist 타투이스트 데이터 
 */

const SmallTattooist = ({ tattooist }) => {
  const tattooist_id = tattooist.drawer_id;
  // 팔로우 요청, 팔로우 취소 요청 API
  const [follow, unfollow] = useFollowClick({ tattooist_id });
  // 팔로잉 여부
  const [following, setFollowing] = useState(false);

  useEffect(() => {
    if (tattooist.isFollowed) setFollowing(true);
  }, [tattooist]);
  
  const onClick = () => {
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
  };

  // 타투이스트 세부 도안 페이지 이동
  const goTattooist = () => {
    goTattooistDetail(tattooist.drawer_id);
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

            {!getCookie('tattooist_id') && (
              <TattooistBtn
                content={following ? "UnFollow" : "Follow"}
                event={onClick}
                size={"small"}
              />
            )}
            
          </SmallTattooistNickname>

          <SmallTattooistLocation>
            <TattooistInfoTitle type="location">
              위치
            </TattooistInfoTitle>
            <TattooistInfoText type="small">
              {tattooist.drawer_location}
            </TattooistInfoText>
          </SmallTattooistLocation>
        </SmallTattooistInfoBox>
      </SmallTattooistProfileBox>
    </>
  );
};

export default React.memo(SmallTattooist);
