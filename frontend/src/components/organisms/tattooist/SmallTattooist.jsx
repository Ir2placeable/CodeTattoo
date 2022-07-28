import {
  SmallTattooistProfileBox,
  ProfileImg,
  SmallTattooistInfoBox,
  SmallTattooistNickname,
  SmallTattooistLocation,
} from "../../../styledComponents";
import TattooistBtn from "../../atomic/tattooist/TattooistBtn";
import { APIURL } from "../../../config/key";
import axios from "axios";
import { getCookie } from "../../../config/cookie";

const SmallTattooist = ({ tattooist }) => {
  console.log("Small Tattooist");

  const Following = async () => {
    const res = await axios.post(`${APIURL}/follow`, {
      user_id: getCookie("user_id"),
      tattooist_id: tattooist.drawer_id,
    });

    if (res.data.success) {
      console.log("following success");
    }
  };

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

  return (
    <>
      <SmallTattooistProfileBox>
        <ProfileImg
          size="tattooist"
          src={tattooist.drawer_image}
          alt={tattooist.drawer_id}
        />
        <SmallTattooistInfoBox>
          <SmallTattooistNickname>
            {tattooist.drawer_nickname}
            <TattooistBtn
              content={tattooist.isFollowed ? "UnFollowed" : "Followed"}
              event={tattooist.isFollowed ? UnFollowing : Following}
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
