import React, { useState, useEffect } from 'react';
import { 
  ContentsDiv,
} from '../../styledComponents';
import { APIURL } from '../../config/key';

import SmallNavigationComp from './SmallNavigationComp';

import { Outlet } from 'react-router-dom';
const ShowDraftList = () => {

  return (
    <>
      <SmallNavigationComp data={[
        {text: 'root', path: '/draft'},
        {text: 'Best', path: '/draft/best'},
        {text: 'All', path: '/draft/all'}
      ]}
        searchBox={true} location={0} />

      <ContentsDiv>
        <Outlet />
      </ContentsDiv>
    </>
  );
};

export default ShowDraftList;