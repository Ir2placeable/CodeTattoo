import React from "react";
import {
  ChattingItemBox,
  ChattingImg,
  ChattingText,
  ChattingTextDiv,
  ChattingReserv,
  ProfileImgIcon,
} from "../../../styledComponents";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";

/**
 * 상위 컴포넌트 === ChattingList.jsx
 * @param {*} param0
 * @returns
 */

const ChattingItem = ({ item, onClick }) => {
  const location = useLocation();

  useEffect(() => {
    const [, , , ,rid] = location.pathname.split('/')

    if(rid === item.reservation_id){
      
    }

  }, [location.pathname])
  
  return (
    <>
      <ChattingItemBox
        onClick={(e) => {
          onClick({ e, item });
        }}
      >
        {item.opponent_image !== "undefined" ? (
          <ChattingImg id="chat_img" src={item.opponent_image} />
        ) : (
          <ProfileImgIcon size="chat">
            <FontAwesomeIcon style={{ fontSize: "35px" }} icon={faUser} />
          </ProfileImgIcon>
        )}

        <ChattingTextDiv>
          <ChattingText size="big" id="chat_nickname">
            {item.opponent_nickname}
          </ChattingText>
          <ChattingText size="medium">{item.content}</ChattingText>
        </ChattingTextDiv>

        <ChattingReserv state={item.confirmed ? "confirmed" : "pending"} />
      </ChattingItemBox>
    </>
  );
};

export default React.memo(ChattingItem);
