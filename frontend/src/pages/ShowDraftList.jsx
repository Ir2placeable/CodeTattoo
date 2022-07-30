import React, { useState } from 'react';
import DraftList from '../components/templates/DraftList';
import Pagination from '../components/organisms/common/Pagination';
import { ContentsDiv } from '../styledComponents';
import SmallNav from '../components/organisms/common/SmallNav';
import { Outlet } from 'react-router-dom';

const ShowDraftList = () => {
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState([]);

  return (
    <>

    <SmallNav data={[
        {text: 'root', path: '/draft'},
        {text: 'Best', path: '/draft/best'},
        {text: 'All', path: '/draft/all'}
      ]}
        isSearch={true} loc={0} />

    <ContentsDiv>
      <Outlet context={{ page }} />

      <Pagination filter="drafts"
        page={page} setPage={setPage}
        pages={pages} setPages={setPages}
      />
    </ContentsDiv>
    </>
  );
};

export default ShowDraftList;