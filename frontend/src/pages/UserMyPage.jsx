import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { 
  MyPageInfoDiv, 
  MyPageMainDiv,
  UserImgDiv,
  userIconStyle,
  MyPageLine,
  ForTattooistDiv,
 } from '../styledComponents';

import MyPageText from './MyPageText';
import MyPageMenuComp from './MyPageMenuComp';
import MyPageButton from './MyPageButton';

const UserMyPage = ({ apiUrl, cookies }) => {
  const params = useParams();
  const [info, setInfo] = useState({
    nickname: '',
    drafts: [],
    tattooists: []
  });

  const getMyPage = async() => {
    const res = await axios.post(`${apiUrl}/user/mypage`, {
      user_id: params.user_id
    })
  }

  useEffect(() => {
    //getMyPage();
  }, []);

  const [draftBtn, setDraftBtn] = useState(false);

  const onDraftsClick = () => {
    setDraftBtn(true);
  }
  const onTattooistClick = () => {
    setDraftBtn(false);
  }

  const navigate = useNavigate();
  const tattooistMode = () => {
    navigate(`/tattooist/mypage/${cookies.isTattooist}`)
  }

  return (
    <>
      <MyPageMainDiv>

        <MyPageInfoDiv>

          <UserImgDiv>
            <FontAwesomeIcon style={userIconStyle} icon={faUser} />
          </UserImgDiv>

          <MyPageText texts={[{name: 'User', desc: info.nickname}]} />

          <MyPageLine />

          <MyPageMenuComp text1={'Drafts'} text2={'Tattooists'} />

          <ForTattooistDiv>
            {cookies.isTattooist ? (
              <div>
                <MyPageButton onClick={tattooistMode} text={'Tattooist Mode'} />
              </div>
            ) : (
              <div>
                <MyPageButton onClick={()=>{}} text={'편집하기'} />
              </div>
            )}
          </ForTattooistDiv>
          
        </MyPageInfoDiv>

      </MyPageMainDiv>
    </>
  );
};

export default UserMyPage;