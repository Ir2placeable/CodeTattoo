import React from 'react';
import MyPageInfo from './MyPageInfo';
import { 
  ContentsDiv, MyPageContentDiv, MyPageCategory,
  CategoryBigText, CategoryUl, CategoryLi, 
  MyPageContentBox
} from '../../styledComponents';

const User = ({ cookies }) => {

  return (
    <ContentsDiv>

      <MyPageInfo cookies={cookies} />

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

        </MyPageContentBox>

      </MyPageContentDiv>

    </ContentsDiv>
  );
};

export default User;