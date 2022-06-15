import React from 'react';
import { 
  CategoryDiv,
  CategoryBox,
  CategoryText,
  CategoryUl,
  CategorySubText,
  CategoryLi
} from '../styledComponents';
import { useNavigate } from 'react-router-dom';

const Category = () => {
  const navigate = useNavigate();

  // User


  // Tattooist
  const goTattooistDrafts = () => {
    navigate('/tattooist/drafts')
  }

  // Tattoo
  const goBestDrafts = () => {
    navigate('/tattoo/best');
  }
  const goRecentDrafts = () => {
    navigate('/tattoo/recent');
  }
  const goAllDrafts = () => {
    navigate('/tattoo/all');
  }


  // Board
  return (
    <>
      <CategoryDiv>
        <CategoryText>Category</CategoryText>

        <CategoryBox>

          <CategoryUl>
            <CategorySubText>User</CategorySubText>
            <CategoryLi>My drafts list</CategoryLi>
            <CategoryLi>My tattooists list</CategoryLi>
          </CategoryUl>

          <CategoryUl>
            <CategorySubText>Tattooist</CategorySubText>
            <CategoryLi onClick={goTattooistDrafts}>
              My drafts list
            </CategoryLi>
            <CategoryLi>Calendar</CategoryLi>
            <CategoryLi>Contact</CategoryLi>
          </CategoryUl>

          <CategoryUl>
            <CategorySubText>Tattoo</CategorySubText>
            <CategoryLi onClick={goBestDrafts}>Best drafts</CategoryLi>
            <CategoryLi onClick={goRecentDrafts}>Recent drafts</CategoryLi>
            <CategoryLi onClick={goAllDrafts}>
              All drafts
            </CategoryLi>
          </CategoryUl>

          <CategoryUl>
            <CategorySubText>Board</CategorySubText>
            <CategoryLi>Q n A</CategoryLi>
            <CategoryLi>Ask</CategoryLi>
            <CategoryLi>Contact</CategoryLi>
          </CategoryUl>

        </CategoryBox>

      </CategoryDiv>
    </>
  );
};

export default React.memo(Category);