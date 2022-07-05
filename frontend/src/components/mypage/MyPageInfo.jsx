import React, { useEffect, useState } from 'react';
import { 
  MyPageInfoDiv, MyPageInfoInner, ProfileImgDiv,
  ProfileImg, ProfileImgEdit, ProfileDescDiv,
  NicknameDiv, DescDiv, ProfileEdit, ProfileIconDiv,
  ProfileEditHoverStyle
} from '../../styledComponents';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faUser } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

const MyPageInfo = ({ cookies, image, desc, filter }) => {
  const [isHover, setIsHover] = useState(false);
  const [id, setId] = useState('');

  useEffect(() => {
    if(cookies.user_id){
      setId(cookies.user_id)
    } else if(cookies.tattooist_id){
      setId(cookies.tattooist_id)
    }
  }, [])

  const navigation = useNavigate();
  const onImgEditClick = () => {
    navigation(`/mypage/${filter}/${id}/image`)
  }
  const onEditClick = () => {
    navigation(`/mypage/${filter}/${id}/info`)
  }

  return (
    <MyPageInfoDiv>

      <MyPageInfoInner>

        <ProfileImgDiv>
          {image ? (
            <ProfileImg 
              src={image}
            />
          ) : (
            <ProfileIconDiv>
              <FontAwesomeIcon icon={faUser}/>
            </ProfileIconDiv>
            
          )}

          <ProfileImgEdit>
            <FontAwesomeIcon icon={faPen} 
              onClick={onImgEditClick} />
          </ProfileImgEdit>
          
        </ProfileImgDiv>

        <ProfileDescDiv>

          <NicknameDiv>
            {cookies.nickname}
          </NicknameDiv>

          {desc && (
            <DescDiv>
              {desc}
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