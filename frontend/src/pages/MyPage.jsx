import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { Routes, Route, useNavigate, Outlet, NavLink } from 'react-router-dom';
import HeartIcon from './HeartIcon';

import { 
  MyPageMainDiv,
  MyPageInfoDiv,
  UserImgDiv,
  UserImg,
  userIconStyle,
  ttIconStyle,
  MyPageLine,
  ForTattooistDiv,
  LikeDiv,
  EmptyDraftBox,
  MyPageContentDiv,
  DraftUploadDiv,
  ImgBox,
  ImgHeartBox,
  MyPageDraftImg,
  ImgInfoDiv,
  TattooistImg,
  DraftTitle
} from '../styledComponents';

import MyPageButton from './MyPageButton';
import Pagination from './Pagination';
import ImgLoad from './ImgLoad';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import MyPageText from './MyPageText';
import MyPageMenuComp from './MyPageMenuComp';
import ShowDraftList from './ShowDraftList';

const MyPage = ({ apiUrl, cookies, setCookie }) => {
  const params = useParams();
  const [info, setInfo] = useState({
    nickname: '',
    specialize: '',
    location: '',
    contact: '',
    drafts: [],
    profile: {
      description: '',
      image: ''
    }
  });

  const pushCookie = () => {
    setCookie('nickname', info.nickname, {maxAge: 3000, path: '/'});
    setCookie('specialize', info.specialize, {maxAge: 3000, path: '/'});
    setCookie('address', info.location, {maxAge: 3000, path: '/'});
    setCookie('contact', info.contact, {maxAge: 3000, path: '/'});
    setCookie('description', info.profile.description, {maxAge: 3000, path: '/'});
    setCookie('image', info.profile.image, {maxAge: 3000, path: '/'});
  }

  const getMyPage = async() => {
    const res = await axios.post(`${apiUrl}/tattooist/mypage`, {
      tattooist_id: params.tattooist_id
    })
    console.log(res.data)
    setInfo(res.data.tattooist_info)
  }

  useEffect(() => {
    getMyPage();
    //console.log(Object.keys(cookies))
  }, [])

  useEffect(() => {
    pushCookie();
  }, [info])

  const [draftBtn, setDraftBtn] = useState(true);

  const navigate = useNavigate();
  const onBooking = () => {
    console.log('예약하기 클릭')
  }

  const onUploadDraft = () => {
    console.log('도안 등록 클릭')
    navigate('/imgload');
  }

  const onEdit = () => {
    window.location.replace(`/tattooist/mypage/edit/${cookies.isTattooist}`);
    // navigate(`/tattooist/mypage/edit/${cookies.isTattooist}`);
  }

  const userMode = () => {
    navigate(`/user/mypage/${cookies.isTattooist}`)
  }

  return (
    <>
      <MyPageMainDiv>
      
        {/* User Information Section */}
        <MyPageInfoDiv>
          <UserImgDiv>
            {info.profile.image ? (
              <div>
                <UserImg src={info.profile.image} />
              </div>
            ):(
              <FontAwesomeIcon style={userIconStyle} icon={faUser} />
            )}
          </UserImgDiv>

          <MyPageText
            texts={
              [{name: 'Tattooist', desc: info.nickname},
              {name: 'Specialize', desc: info.specialize},
              {name: 'Location', desc: info.location},
              {name: 'Contact', desc: info.contact},
              {name: 'Description', desc: info.profile.description}]}
          />

          <MyPageLine />

          <MyPageMenuComp text1={'Drafts'} text2={'Calendar'} />

          <ForTattooistDiv>
            {/* User 면 예약하기 & 하트 이모티콘 보여주고 */}
            {/* Tattooist면 Edit 버튼 보여주기 */}
            {!cookies.isTattooist ? (
              <div>
                <MyPageButton onClick={onBooking} text={'예약하기'} />
                <LikeDiv>
                  <HeartIcon size={30} />
                </LikeDiv>
              </div>
            ) : (
              <div>
                <MyPageButton onClick={onEdit} text={'편집하기'} />
                <MyPageButton onClick={userMode} text={'User Mode'} />
              </div>
            )}
            
          </ForTattooistDiv>

        </MyPageInfoDiv>

      
        {/* Contens Section */}
        { draftBtn ? (
          <MyPageContentDiv>

            {cookies.isTattooist ? (
              <DraftUploadDiv>
                <MyPageButton onClick={onUploadDraft} text={'도안 등록'} />
              </DraftUploadDiv>
            ) : (
              <div></div>
            )}

            <ShowDraftList text={''} drafts={info.drafts} tattooist={true} />
            
          </MyPageContentDiv>
        ) : (
          <div>Calendar 영역</div>
        )}

      </MyPageMainDiv> 
    </>
  );
};

export default MyPage;