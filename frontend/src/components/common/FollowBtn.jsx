import React, { useState, useEffect } from "react";
import axios from "axios";
import { APIURL } from "../../config/key";
import { Btn } from "../../styledComponents";

const FollowBtn = ({ cookies, tattooist_id, isFollowed }) => {
  const [followClick, setFollowClick] = useState(false);
  const [text, setText] = useState("Follow");

  useEffect(() => {
    if (isFollowed) {
      setFollowClick(true);
      setText("UnFollow");
    }
    console.log(tattooist_id);
  }, []);

  const Following = async () => {
    const res = await axios.post(`${APIURL}/follow`, {
      user_id: cookies.user_id,
      tattooist_id: tattooist_id,
    });

    if (res.data.success) {
      console.log("following success");
    }
  };

  const unFollowing = async () => {
    const res = await axios.delete(
      `${APIURL}/follow/?user_id=${cookies.user_id}&tattooist_id=${tattooist_id}`
    );

    if (res.data.success) {
      console.log("unfollowing success");
    }
  };

  const onFollowClick = () => {
    if (!cookies.user_id) {
      alert("유저 로그인 상태에서 가능합니다.");
    }

    if (followClick) {
      // unfollowing
      setFollowClick(false);
      unFollowing();
      setText("Follow");
    } else {
      // following
      setFollowClick(true);
      Following();
      setText("UnFollow");
    }
  };

  return (
    <>
      <Btn onClick={onFollowClick}>{text}</Btn>
    </>
  );
};

export default React.memo(FollowBtn);
