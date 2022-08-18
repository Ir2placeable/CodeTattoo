import React, { useState } from 'react';
import DraftList from '../components/templates/DraftList';
import Pagination from '../components/organisms/common/Pagination';
import { ContentsDiv } from '../styledComponents';
import SmallNav from '../components/organisms/common/SmallNav';
import { Outlet, useLocation } from 'react-router-dom';
import GoUploadBtn from '../components/atomic/draft/GoUploadBtn';
import { getCookie } from '../config/cookie';
import { useEffect } from 'react';

const ShowDraftList = () => {
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState([]);

  const location = useLocation();
  useEffect(() => {
    setPage(1);
  }, [location.pathname])

  return (
    <>

    <SmallNav data={[
        {text: 'root', path: '/drafts'},
        {text: 'Best', path: '/drafts/best'},
        {text: 'All', path: '/drafts/all'}
      ]}
        isSearch={true} loc={0} />

    {getCookie('tattooist_id') && (
      <GoUploadBtn />
    )}

    <ContentsDiv>
      <Outlet context={{ page }} />

      <Pagination
        page={page} setPage={setPage}
        pages={pages} setPages={setPages}
      />
    </ContentsDiv>
    </>
  );
};

export default ShowDraftList;