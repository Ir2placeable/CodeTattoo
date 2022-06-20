import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { 
  MyPageInfoDiv, 
  MyPageMainDiv,
  UserImgDiv,
  UserImg,
  userIconStyle,
  MyPageLine,
  ForTattooistDiv,
 } from '../styledComponents';

import MyPageText from './MyPageText';
import MyPageMenuComp from './MyPageMenuComp';
import MyPageButton from './MyPageButton';

const UserMyPage = ({ apiUrl, cookies, setCookie }) => {
  const params = useParams();
  const [info, setInfo] = useState({
    nickname: '',
    drafts: [],
    tattooists: [],
    profile: {
      description: '',
      image: ''
    }
  });

  const getMyPage = async() => {
    const res = await axios.post(`${apiUrl}/user/mypage`, {
      user_id: params.user_id
    })
    console.log(res.data);
    // setInfo(res.data.user_info);
  }

  useEffect(() => {
    //getMyPage();
  }, []);
  useEffect(() => {
    setCookie('name', info.nickname, {maxAge: 3000, path: '/'});
    setCookie('user_desc', info.profile.description, {maxAge: 3000, path: '/'});
    setCookie('user_image', info.profile.image, {maxAge: 3000, path: '/'});
  }, [info]);

  const [draftBtn, setDraftBtn] = useState(false);

  const navigate = useNavigate();
  const tattooistMode = () => {
    navigate(`/tattooist/mypage/${cookies.isTattooist}`)
  }

  return (
    <>
      <MyPageMainDiv>

        <MyPageInfoDiv>

          <UserImgDiv>
            {info.profile.image ? (
              <div>
                <UserImg src={info.profile.image} />
              </div>
            ) : (
              <FontAwesomeIcon style={userIconStyle} icon={faUser} />
            )}
            
          </UserImgDiv>

          <MyPageText texts={[{name: 'User', desc: info.nickname},
              {name: 'Description', desc: info.profile.description}]} />

          <MyPageLine />

          <MyPageMenuComp text1={'Drafts'} text2={'Tattooists'}
          draftBtn={draftBtn} setDraftBtn={setDraftBtn} />

          <ForTattooistDiv>
            <MyPageButton onClick={()=>{}} text={'편집하기'} />
            {cookies.isTattooist ? (
                <MyPageButton onClick={tattooistMode} text={'Tattooist Mode'} />
            ) : (
              <div></div>
            )}
          </ForTattooistDiv>
          
        </MyPageInfoDiv>

      </MyPageMainDiv>
    </>
  );
};

export default UserMyPage;