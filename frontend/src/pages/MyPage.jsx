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
import CalendarComp from './CalendarComp';
import FollowTattooist from './FollowTattooist';

const MyPage = ({ apiUrl, cookies, setCookie, removeCookie }) => {
  const params = useParams();
  const [info, setInfo] = useState({
    nickname: '',
    specialize: '',
    location: '',
    contact: '',
    drafts: [],
    description: '',
    image: ''
  });

  const pushCookie = () => {
    setCookie('nickname', info.nickname, {maxAge: 3000, path: '/'});
    setCookie('specialize', info.specialize, {maxAge: 3000, path: '/'});
    setCookie('address', info.location, {maxAge: 3000, path: '/'});
    setCookie('contact', info.contact, {maxAge: 3000, path: '/'});
    setCookie('description', info.description, {maxAge: 3000, path: '/'});
    setCookie('image', info.image, {maxAge: 3000, path: '/'});
  }

  const getMyPage = async() => {
    const res = await axios.get(`${apiUrl}/tattooist/my-page/?tattooist_id=${params.tattooist_id}`)
    console.log(res.data.tattooist_info.drafts)
    const sorted_drafts = res.data.tattooist_info.drafts.sort(function(a, b){
      return -(a.timestamp - b.timestamp)
    })
    console.log('sort: ',sorted_drafts)
    console.log('get : ', res.data)
    setInfo(res.data.tattooist_info)
  }

  useEffect(() => {
    getMyPage();
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
    console.log(cookies.user_id)
    navigate(`/user/mypage/${cookies.user_id}`)
  }

  return (
    <>
      <MyPageMainDiv>
      
        {/* User Information Section */}
        <MyPageInfoDiv>
          <UserImgDiv>
            {info.image ? (
              <div>
                <UserImg src={info.image} />
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
              {name: 'Description', desc: info.description}]}
          />

          <MyPageLine />

          <MyPageMenuComp text1={'Drafts'} text2={'Calendar'}
          draftBtn={draftBtn} setDraftBtn={setDraftBtn} />

          <ForTattooistDiv>
            {/* User 면 예약하기 & 하트 이모티콘 보여주고 */}
            {/* Tattooist면 Edit 버튼 보여주기 */}
            {!cookies.isTattooist ? (
              <div> 
                <MyPageButton onClick={onBooking} text={'예약하기'} />
                <LikeDiv>
                  <FollowTattooist user_id={cookies.user_id} tattooist_id={params.tattooist_id} cookies={cookies} />
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

            <ShowDraftList cookies={cookies} text={''} drafts={info.drafts} tattooist={true} />
          </MyPageContentDiv>
        ) : (
          <MyPageContentDiv>
            <CalendarComp apiUrl={apiUrl} cookies={cookies} />
          </MyPageContentDiv>
        )}

      </MyPageMainDiv> 
    </>
  );
};

export default MyPage;