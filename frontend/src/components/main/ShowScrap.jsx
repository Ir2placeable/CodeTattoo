import React, { useEffect, useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { 
  ContentsDiv, 
} from '../../styledComponents';

import SmallNavigationComp from './SmallNavigationComp';

const ShowScrap = () => {

  
  return (
  <>
      <SmallNavigationComp data={[
        {text: 'root', path: '/scrap'},
        {text: 'Draft', path: '/scrap/draft'},
        {text: 'Tattooist', path: '/scrap/tattooist'}
      ]}
        searchBox={false} location={2} />
      

      <ContentsDiv>
        <Outlet />
      </ContentsDiv>
    </>
  )
};

export default ShowScrap;