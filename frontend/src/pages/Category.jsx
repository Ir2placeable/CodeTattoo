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
  const goTattooists = () => {
    navigate('/tattooists')
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
  const goBoard = () => {
    navigate('/board')
  }
  return (
    <>
      <CategoryDiv>
        <CategoryText>Category</CategoryText>

        <CategoryBox>

          <CategoryUl>
            <CategorySubText>Tattooist</CategorySubText>
            <CategoryLi onClick={goTattooists}>
              Tattooists List
            </CategoryLi>
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
            <CategoryLi onClick={goBoard}>Board</CategoryLi>
            <CategoryLi>Ask</CategoryLi>
          </CategoryUl>

        </CategoryBox>

      </CategoryDiv>
    </>
  );
};

export default React.memo(Category);