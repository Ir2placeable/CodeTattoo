import React from 'react';
import { 
  MainPageDiv, MainNavigation, MainNavigationInner,
  MainNavigationBtn, MainNavigationBtnStyle, 
  MainContentsDiv, SmallNavigation, SmallNavigationBtn,
  SearchInput, SearchIconStyle, ContentsDiv
} from '../../styledComponents';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'

const MainPage = ({ cookies }) => {
  return (
    <>
      <MainNavigation>

        <MainNavigationInner>

          <MainNavigationBtn>도안</MainNavigationBtn>
          <MainNavigationBtn>타투이스트</MainNavigationBtn>
          <MainNavigationBtn>스크랩</MainNavigationBtn>
          <MainNavigationBtn>마이타투</MainNavigationBtn>

        </MainNavigationInner>

      </MainNavigation>

      <MainContentsDiv>

        <SmallNavigation>

          <SmallNavigationBtn>Best</SmallNavigationBtn>
          <SmallNavigationBtn>All</SmallNavigationBtn>
          <SmallNavigationBtn>
            <SearchInput />
            <FontAwesomeIcon style={SearchIconStyle} icon={faMagnifyingGlass} />
          </SmallNavigationBtn>

        </SmallNavigation>


        <ContentsDiv>

        </ContentsDiv>

      </MainContentsDiv>
    </>
  );
};

export default MainPage;