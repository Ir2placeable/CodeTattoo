import React, { useEffect, useState } from 'react';
import MyPageInfo from './MyPageInfo';
import { 
  MyPageBigDiv , MyPageContentDiv, MyPageCategory,
  CategoryBigText, CategoryUl, CategoryLi, 
  MyPageContentBox
} from '../../styledComponents';
import { Outlet, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { APIURL } from '../../config/key';

// - GET :  http://3.39.196.91:3001/user/my-page
// - query : { user_id }
// - return : { success, user_info }
//     - user_info : { user_id, nickname, description, image }
const User = ({ cookies, setCookie }) => {
  const [info, setInfo] = useState({
    user_id: '',
    nickname: '',
    description: '',
    image: ''
  })

  const sendRequest = async() => {
    const res = await axios.get(
      `${APIURL}/user/my-page/?user_id=${cookies.user_id}`)

    if(res.data.success){
      console.log(res.data)
      setInfo(res.data.user_info)
      console.log('서버 이미지', res.data.user_info.image)
    }
  }

  useEffect(() => {
    sendRequest();
    console.log('쿠키 이미지',cookies.profile_img_src)
  }, [])

  useEffect(() => {
    setCookie('profile_img_src', info.image, { maxAge: 3000, path: '/'})
    setCookie('nickname', info.nickname, { maxAge: 3000, path: '/'})
    setCookie('profile_desc', info.description, { maxAge: 3000, path: '/'})
  }, [info])

  const navigate = useNavigate();
  const onClick = (e) => {
    const text = e.target.innerText;

    if(text === '찜한 타투'){
      navigate(`/mypage/user/${cookies.user_id}/scrap`)
    }
  }

  return (
    <MyPageBigDiv>

      <MyPageInfo cookies={cookies} filter="user" image={info.image} />

      <MyPageContentDiv>

        <MyPageCategory>
          <CategoryBigText>Category</CategoryBigText>
          <CategoryUl>
            <CategoryLi onClick={onClick}>내 정보</CategoryLi>
            <CategoryLi onClick={onClick}>찜한 타투</CategoryLi>
            <CategoryLi onClick={onClick}>팔로잉</CategoryLi>
            <CategoryLi onClick={onClick}>마이 타투</CategoryLi>
            <CategoryLi onClick={onClick}>비밀번호 변경</CategoryLi>
            <CategoryLi onClick={onClick}>계정 관리</CategoryLi>
          </CategoryUl>
        </MyPageCategory>

        <MyPageContentBox>
          <Outlet />
        </MyPageContentBox>

      </MyPageContentDiv>

    </MyPageBigDiv>
  );
};

export default User;