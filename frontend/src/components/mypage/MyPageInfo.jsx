import React, { useState } from 'react';
import { 
  MyPageInfoDiv, MyPageInfoInner, ProfileImgDiv,
  ProfileImg, ProfileImgEdit, ProfileDescDiv,
  NicknameDiv, DescDiv, ProfileEdit, ProfileIconDiv,
  ProfileEditHoverStyle
} from '../../styledComponents';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faUser } from '@fortawesome/free-solid-svg-icons';

const MyPageInfo = ({ cookies }) => {
  const [isHover, setIsHover] = useState(false);

  const onEditClick = () => {

  }

  return (
    <MyPageInfoDiv>

      <MyPageInfoInner>

        <ProfileImgDiv>
          {cookies.profile_img ? (
            <ProfileImg 
              src={cookies.profile_img}
            />
          ) : (
            <ProfileIconDiv>
              <FontAwesomeIcon icon={faUser}/>
            </ProfileIconDiv>
            
          )}

          <ProfileImgEdit>
            <FontAwesomeIcon icon={faPen} />
          </ProfileImgEdit>
          
        </ProfileImgDiv>

        <ProfileDescDiv>

          <NicknameDiv>
            {cookies.nickname}
          </NicknameDiv>

          {cookies.profile_desc && (
            <DescDiv>
              {cookies.profile_desc}
            </DescDiv>
          )}

        </ProfileDescDiv>

        <ProfileEdit style={isHover ? ProfileEditHoverStyle : {}}
          onMouseEnter={() => setIsHover(true)}
          onMouseLeave={() => setIsHover(false)}
          onClick={onEditClick}>
          편집하기
        </ProfileEdit>

      </MyPageInfoInner>
      
    </MyPageInfoDiv>
  );
};

export default MyPageInfo;