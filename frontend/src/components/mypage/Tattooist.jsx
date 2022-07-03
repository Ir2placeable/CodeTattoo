import React from 'react';
import MyPageInfo from './MyPageInfo';
import { ContentsDiv } from '../../styledComponents';

const Tattooist = ({ cookies }) => {
  return (
    <ContentsDiv>

      <MyPageInfo cookies={cookies} />
      
    </ContentsDiv>
  );
};

export default Tattooist;