import React, { useEffect, useState } from 'react';
import MyPageInfo from './MyPageInfo';
import { 
  ContentsDiv, MyPageContentDiv, MyPageCategory,
  CategoryBigText, CategoryUl, CategoryLi, 
  MyPageContentBox
} from '../../styledComponents';
import { Outlet } from 'react-router-dom';
import axios from 'axios';
import { APIURL } from '../../config/key';

// - GET :  http://3.39.196.91:3001/user/my-page
// - query : { user_id }
// - return : { success, user_info }
//     - user_info : { user_id, nickname, description, image }
const User = ({ cookies }) => {
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

    }
  }

  useEffect(() => {
    sendRequest();
  }, [])

  return (
    <ContentsDiv>

      <MyPageInfo cookies={cookies} 
        image={info.image} desc={info.description}
        filter="user" />

      <MyPageContentDiv>

        <MyPageCategory>
          <CategoryBigText>Category</CategoryBigText>
          <CategoryUl>
            <CategoryLi>내 정보</CategoryLi>
            <CategoryLi>찜한 타투</CategoryLi>
            <CategoryLi>팔로잉</CategoryLi>
            <CategoryLi>마이 타투</CategoryLi>
            <CategoryLi>비밀번호 변경</CategoryLi>
            <CategoryLi>계정 관리</CategoryLi>
          </CategoryUl>
        </MyPageCategory>

        <MyPageContentBox>
          <Outlet />
        </MyPageContentBox>

      </MyPageContentDiv>

    </ContentsDiv>
  );
};

export default User;