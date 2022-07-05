import React, { useState, useEffect } from 'react';
import MyPageInfo from './MyPageInfo';
import { 
  ContentsDiv, MyPageContentDiv, MyPageCategory,
  CategoryBigText, CategoryUl, CategoryLi, 
  MyPageContentBox
} from '../../styledComponents';
import axios from 'axios';
import { APIURL } from '../../config/key';
import { Outlet } from 'react-router-dom';

// - GET : http://3.39.196.91:3001/tattooist/my-page
// - query : { tattooist_id }
// - return : { success, tattooist_info }
//     - tattooist_info = { image, nickname, description, 
//       specialize, office, contact }
const Tattooist = ({ cookies }) => {
  const [info, setInfo] = useState({
    image: '',
    nickname: '',
    description: '',
    specialize: '',
    office: '',
    contact: ''
  })

  const sendRequest = async() => {
    const res = await axios.get(
      `${APIURL}/tattooist/my-page/?tattooist_id=${cookies.tattooist_id}`)

    if(res.data.success){
      console.log(res.data);
      setInfo(res.data.tattooist_info)
    }
  }

  useEffect(() => {
    sendRequest();
  }, []);

  return (
    <ContentsDiv>

      <MyPageInfo cookies={cookies}
        image={info.image} filter="tattooist" />


      <MyPageContentDiv>

        <MyPageCategory>
          <CategoryBigText>Category</CategoryBigText>
          <CategoryUl>
            <CategoryLi>내 정보</CategoryLi>
            <CategoryLi>작업물 관리</CategoryLi>
            <CategoryLi>도안 관리</CategoryLi>
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

export default Tattooist;