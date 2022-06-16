import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { Routes, Route, useNavigate, Outlet, NavLink } from 'react-router-dom';
import HeartIcon from './HeartIcon';

import { 
  MyPageMainDiv,
  MyPageInfoDiv,
  UserImgDiv,
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

const MyPage = ({ apiUrl, cookies }) => {
  const params = useParams();
  const [info, setInfo] = useState({
    nickname: '',
    specialize: '',
    location: '',
    contact: '',
    drafts: []
  });

  const getMyPage = async() => {
    const res = await axios.post(`${apiUrl}/tattooist/mypage`, {
      tattooist_id: params.tattooist_id
    })
    console.log(res.data)
    setInfo(res.data.tattooist_info);
  };

  const getDrafts = async() => {
    const res = await axios.post(`${apiUrl}/tattooist/mypage/drafts`, {
      tattooist_id: params.tattooist_id
    })
    console.log(res.data)
  }

  useEffect(() => {
    getMyPage();
  }, [])

  const [draftBtn, setDraftBtn] = useState(true);

  const navigate = useNavigate();
  const onBooking = () => {
    console.log('예약하기 클릭')
  }

  const onUploadDraft = () => {
    console.log('도안 등록 클릭')
    navigate('/imgload');
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
            <FontAwesomeIcon style={userIconStyle} icon={faUser} />
          </UserImgDiv>

          <MyPageText
            texts={
              [{name: 'Tattooist', desc: info.nickname},
              {name: 'Specialize', desc: info.specialize},
              {name: 'Location', desc: info.location},
              {name: 'Contact', desc: info.contact}]}
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
                <MyPageButton onClick={onBooking} text={'편집하기'} />
                <MyPageButton onClick={userMode} text={'User Mode'} />
              </div>
            )}
            
          </ForTattooistDiv>

        </MyPageInfoDiv>

      
        {/* Contens Section */}
        {/* <EmptyDraftBox>아직 도안이 없습니다.</EmptyDraftBox> */}
        { draftBtn ? (
          <MyPageContentDiv>

            {cookies.isTattooist ? (
              <DraftUploadDiv>
                <MyPageButton onClick={onUploadDraft} text={'도안 등록'} />
              </DraftUploadDiv>
            ) : (
              <div></div>
            )}
            

            {/* <ImgBox>
              <ImgHeartBox>
                <HeartIcon size={28} />
              </ImgHeartBox>
              <MyPageDraftImg 
                src={""}
                alt={""}
                width={'300px'}
                height={'300px'} />
              <ImgInfoDiv>
                <TattooistImg>
                  <FontAwesomeIcon style={ttIconStyle} icon={faUser} />
                </TattooistImg>
                <DraftTitle>도안 이름</DraftTitle>
              </ImgInfoDiv>
            </ImgBox> */}

            <ShowDraftList text={''} drafts={info.drafts} tattooist={true} />

            {/* <ImgLoad /> */}
            {/* <ImgLoad apiUrl={apiUrl} cookies={cookies} /> */}
            {/* <Routes>
              <Route path='/img_load' element={<ImgLoad apiUrl={apiUrl} cookies={cookies} />} />
            </Routes> */}
            
          </MyPageContentDiv>
        ) : (
          <div>Calendar 영역</div>
        )}

      {/* <Outlet /> */}
      </MyPageMainDiv> 
    </>
  );
};

export default MyPage;