import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";
import { getCookie } from "../../../config/cookie";
import { APIURL } from "../../../config/key";
import { TattooistControl } from "../../../styledComponents";
import TattooistBtn from "../../atomic/tattooist/TattooistBtn";

const TattooistControlBox = ({ tattooist }) => {
  const Following = async () => {
    const res = await axios.post(`${APIURL}/follow`, {
      user_id: getCookie("user_id"),
      tattooist_id: tattooist.tattooist_id,
    });

    if (res.data.success) {
      console.log("following success");
    }
  };

  const UnFollowing = async () => {
    const res = await axios.delete(
      `${APIURL}/follow/?user_id=${getCookie("user_id")}&tattooist_id=${
        tattooist.tattooist_id
      }`
    );

    if (res.data.success) {
      console.log("unfollowing success");
    }
  };

  // reserve 이동 추가해야 함

  return (
    <>
      <TattooistControl>
        <TattooistBtn
          content={tattooist.isFollowed ? "UnFollowed" : "Followed"}
          event={tattooist.isFollowed ? UnFollowing : Following}
          size={"medium"}
        />
        <TattooistBtn content={"Reservation"} size={"medium"} />
      </TattooistControl>
    </>
  );
};

export default TattooistControlBox;
