import {
  SmallTattooistProfileBox,
  ProfileImg,
  SmallTattooistInfoBox,
  SmallTattooistNickname,
  SmallTattooistLocation,
  ProfileImgIcon,
} from "../../../styledComponents";
import TattooistBtn from "../../atomic/tattooist/TattooistBtn";
import { APIURL } from "../../../config/key";
import axios from "axios";
import { getCookie } from "../../../config/cookie";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { useCallback } from "react";
import useFollowClick from '../../../hooks/useFollowClick'
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const SmallTattooist = ({ tattooist }) => {
  const tattooist_id = tattooist.drawer_id;
  const [follow, unfollow] = useFollowClick({ tattooist_id });
  const [following, setFollowing] = useState(false);
  // console.log("Small Tattooist", tattooist);

  const Following = async () => {
    const res = await axios.post(`${APIURL}/follow`, {
      user_id: getCookie("user_id"),
      tattooist_id: tattooist.drawer_id,
    });

    if (res.data.success) {
      console.log("following success");
    }
  };

  useEffect(() => {
    // console.log('small tattooist: ', tattooist)
    if(tattooist.isFollowed){
      setFollowing(true);
    }
  }, [tattooist]);

  const UnFollowing = async () => {
    const res = await axios.delete(
      `${APIURL}/follow/?user_id=${getCookie("user_id")}&tattooist_id=${
        tattooist.drawer_id
      }`
    );

    if (res.data.success) {
      console.log("unfollowing success");
    }
  };

  const onClick = useCallback(() => {
    if(following){
      setFollowing(false);
      unfollow();
    } else {
      setFollowing(true);
      follow();
    }
  }, [])

  const navigate = useNavigate();
  const goTattooist = () => {
    navigate(`/tattooist/${tattooist.drawer_id}/draft`)
  }

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
            <FontAwesomeIcon 
              style={{fontSize: '80px'}} icon={faUser} />
          </ProfileImgIcon>
        )}
        </div>
        
        <SmallTattooistInfoBox>
          <SmallTattooistNickname>
            {tattooist.drawer_nickname}
            <TattooistBtn
              content={tattooist.isFollowed ? "UnFollow" : "Follow"}
              event={onClick}
              // event={tattooist.isFollowed ? UnFollowing : Following}
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
