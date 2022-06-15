import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as heartReqular } from '@fortawesome/free-regular-svg-icons';

import { 
  MyPageMainDiv,
  MyPageInfoDiv,
  UserImgDiv,
  UserIcon,
  userIconStyle,
  UserTextDiv,
  UserTextUl,
  UserTextLi,
  MyPageLine,
  MyPageMenu,
  MyPageMenuBtn,
  menuBtnClickedStyle,
  ForTattooistDiv,
  BookingBtn,
  bookingBtnHoverStyle,
  LikeDiv,
  LikeIcon,
  heartStyle,
  EmptyDraftBox
} from '../styledComponents';

const MyPage = () => {
  const [isHover, setIsHover] = useState(false);
  const [draftBtn, setDraftBtn] = useState(true);
  const [heartClick, setHeartClick] = useState(false);

  const onHover = () => {
    setIsHover(true);
  }
  const onLeave = () => {
    setIsHover(false);
  }

  const onDraftsClick = () => {
    setDraftBtn(true)
  }
  const onCalendarClick = () => {
    setDraftBtn(false)
  }

  const onHeartClick = () => {
    setHeartClick(heartClick ? false : true);
  }

  return (
    <>
      <MyPageMainDiv>
      
        {/* User Information Section */}
        <MyPageInfoDiv>
          <UserImgDiv>
            <FontAwesomeIcon style={userIconStyle} icon={faUser} />
          </UserImgDiv>

          <UserTextDiv>
            <UserTextUl>
              <UserTextLi>
                Tattooist
              </UserTextLi>
              <UserTextLi>
                Location - 경기도 평택시 지산동
              </UserTextLi>
              <UserTextLi>
                Contact - 010 6595 0827
              </UserTextLi>
            </UserTextUl>
          </UserTextDiv>

          <MyPageLine />

          <MyPageMenu>
            <MyPageMenuBtn
              style={draftBtn ? menuBtnClickedStyle : {}}
              onClick={onDraftsClick}>
              Drafts
            </MyPageMenuBtn>
            <MyPageMenuBtn
              style={draftBtn ? {} : menuBtnClickedStyle}
              onClick={onCalendarClick}>
              Calendar
            </MyPageMenuBtn>
          </MyPageMenu>

          <ForTattooistDiv>
            {/* User 면 예약하기 & 하트 이모티콘 보여주고 */}
            {/* Tattooist면 Edit 버튼 보여주기 */}
            <BookingBtn 
              style={isHover ? bookingBtnHoverStyle : {}}
              onMouseEnter={onHover}
              onMouseLeave={onLeave}>
                예약하기
            </BookingBtn>
            <LikeDiv>
              <FontAwesomeIcon 
                onClick={onHeartClick} 
                style={heartStyle} 
                icon={heartClick ? faHeart : heartReqular} />
            </LikeDiv>
          </ForTattooistDiv>

        </MyPageInfoDiv>

      
        {/* Contens Section */}
        {/* <EmptyDraftBox>아직 도안이 없습니다.</EmptyDraftBox> */}
        { draftBtn ? (
          <div>Draft 영역</div>
        ) : (
          <div>Calendar 영역</div>
        )}

      </MyPageMainDiv> 
    </>
  );
};

export default MyPage;