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
import { useState } from "react";

/** 상위 컴포넌트 === ChattingList.jsx
 * 채팅 페이지 / 채팅 아이템 
 * @param {Object} item 채팅 아이템 데이터
 * @param {Function} onClick Chatting Room에 데이터 전달 & Style 적용
 */

const ChattingItem = ({ item, onClick }) => {
  const location = useLocation();
  // CSS style 적용
  const [style, setStyle] = useState('')

  useEffect(() => {
    const [, , , reserv_id] = location.pathname.split('/')
    if(reserv_id === item.reservation_id){
      setStyle('click')
      onClick({ item, flag: true, path: location.pathname })
    } else {
      setStyle('none')
    }

  }, [location.pathname])

  
  return (
    <>
      <ChattingItemBox
        onClick={() => {
          onClick({ item, flag: false, path: '' });
        }}
        type={style}
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
          <ChattingText size="medium">
            {item.content.length > 20 ? (
              <>
                {item.content.slice(0, 20)}...
              </>
            ) : (
              <>
                {item.content}
              </>
            )}
          </ChattingText>
        </ChattingTextDiv>

        {/* <ChattingReserv state={item.confirmed ? "confirmed" : "pending"} /> */}
      </ChattingItemBox>
    </>
  );
};

export default React.memo(ChattingItem);
