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
  MyPageContentDiv,
 } from '../styledComponents';

import MyPageText from './MyPageText';
import MyPageMenuComp from './MyPageMenuComp';
import MyPageButton from './MyPageButton';
import ShowDraftList from './ShowDraftList';

const UserMyPage = ({ apiUrl, cookies, setCookie }) => {
  const params = useParams();
  const [info, setInfo] = useState({
    nickname: '',
    location: '',
    description: '',
    image: '',
    drafts: [],  // _id, title, image, timestamp
    tattooists: []
  });

  const getMyPage = async() => {
    const res = await axios.get(`${apiUrl}/user/my-page/?user_id=${params.user_id}`)
    
    console.log(res)

    setInfo({
      nickname: res.data.user_info.name,
      location: res.data.user_info.location,
      description: res.data.user_info.description,
      image: res.data.user_info.image,
      drafts: res.data.drafts
    })
  }

  useEffect(() => {
    getMyPage();
  }, []);

  useEffect(() => {
    setCookie('name', info.nickname, {maxAge: 3000, path: '/'});
    setCookie('user_desc', info.description, {maxAge: 3000, path: '/'});
    setCookie('user_image', info.image, {maxAge: 3000, path: '/'});

    setCookie('scraps', info.drafts, {maxAge: 3000, path: '/'});
  }, [info]);

  const [draftBtn, setDraftBtn] = useState(true);

  const navigate = useNavigate();
  const goEdit = () => {
    window.location.replace(`/user/mypage/edit/${cookies.user_id}`);
  }
  const tattooistMode = () => {
    navigate(`/tattooist/mypage/${cookies.isTattooist}`)
  }

  return (
    <>
      <MyPageMainDiv>

        <MyPageInfoDiv>

          <UserImgDiv>
            {info.image ? (
              <div>
                <UserImg src={info.image} />
              </div>
            ) : (
              <FontAwesomeIcon style={userIconStyle} icon={faUser} />
            )}
            
          </UserImgDiv>

          <MyPageText texts={[{name: 'User', desc: info.nickname},
              {name: 'Description', desc: info.description}]} />

          <MyPageLine />

          <MyPageMenuComp text1={'Drafts'} text2={'Tattooists'}
          draftBtn={draftBtn} setDraftBtn={setDraftBtn} />

          <ForTattooistDiv>
            <MyPageButton onClick={goEdit} text={'편집하기'} />
            {cookies.isTattooist ? (
                <MyPageButton onClick={tattooistMode} text={'Tattooist Mode'} />
            ) : (
              <div></div>
            )}
          </ForTattooistDiv>
          
        </MyPageInfoDiv>

        { draftBtn ? (
          <MyPageContentDiv>
            {/* <ShowDraftList cookies={cookies} text={''} drafts={info.drafts} tattooist={false} /> */}
          </MyPageContentDiv>
        ) : (
          <div>타투이스트 찜 영역</div>
        )}

      </MyPageMainDiv>
    </>
  );
};

export default UserMyPage;