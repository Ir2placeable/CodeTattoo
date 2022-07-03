import React from 'react';
import { Outlet } from 'react-router-dom';
import { 
  ContentsDiv
} from '../../styledComponents';

import SmallNavigationComp from './SmallNavigationComp';

const ShowManageDraft = () => {
  return (
    <>
      <SmallNavigationComp data={[
        {text: 'root', path: '/manageDraft'},
        {text: '관리', path: '/manageDraft/manage'},
        {text: '추가', path: '/manageDraft/upload'}
      ]}
        searchBox={false} location={3} />

      <ContentsDiv>
        <Outlet />
      </ContentsDiv>
    </>
  );
};

export default ShowManageDraft;