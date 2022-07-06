import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as heartReqular } from "@fortawesome/free-regular-svg-icons";
import axios from "axios";
import { APIURL } from "../../config/key";

// - POST : http://3.39.196.91:3001/scrap
// - body : { user_id, draft_id }
// - return : { success }
// - DELETE : http://3.39.196.91:3001/scrap
// - body : { user_id, draft_id }
// - return : { success }
const HeartIcon = ({ size, cookies, draft_id, isScraped }) => {
  const [heartClick, setHeartClick] = useState(false);

  useEffect(() => {
    if (isScraped) {
      setHeartClick(true);
    }
  }, []);

  const heartIconStyle = {
    fontSize: `${size}px`,
    cursor: "pointer",
    color: "red",
  };

  const sendScrap = async () => {
    const res = await axios.post(`${APIURL}/scrap`, {
      user_id: cookies.user_id,
      draft_id: draft_id,
    });

    if (res.data.success) {
      console.log("scrap success");
    }
  };

  const sendDeleteScrap = async () => {
    const res = await axios.delete(
      `${APIURL}/scrap/?user_id=${cookies.user_id}&draft_id=${draft_id}`
    );

    if (res.data.success) {
      console.log("scrap delete success");
    }
  };

  const onHeartClick = () => {
    if (!cookies.user_id) {
      // 로그인 안 한 유저이거나 타투이스트일 때 스크랩 기능 지원 x
      alert("스크랩 기능은 유저 로그인 상태에서 가능합니다.");
      return;
    }

    setHeartClick(heartClick ? false : true);
    if (heartClick) {
      // 스크랩 해제
      setHeartClick(false);
      sendDeleteScrap();
    } else {
      // 스크랩
      setHeartClick(true);
      sendScrap();
    }
  };

  return (
    <>
      <FontAwesomeIcon
        onClick={onHeartClick}
        style={heartIconStyle}
        icon={heartClick ? faHeart : heartReqular}
      />
    </>
  );
};

export default React.memo(HeartIcon);
