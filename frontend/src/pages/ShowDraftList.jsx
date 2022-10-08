import React, { useState } from 'react';
import DraftList from '../components/templates/DraftList';
import Pagination from '../components/organisms/common/Pagination';
import { ContentsDiv } from '../styledComponents';
import SmallNav from '../components/organisms/common/SmallNav';
import { Outlet, useLocation } from 'react-router-dom';
import GoUploadBtn from '../components/atomic/draft/GoUploadBtn';
import { getCookie } from '../config/cookie';
import { useEffect } from 'react';

/* 도안 목록 페이지 */
const ShowDraftList = () => {
  // 현재 페이지 상태 
  const [page, setPage] = useState(1);
  // 전체 페이지 배열 상태
  const [pages, setPages] = useState([]);

  const location = useLocation();
  useEffect(() => {
    setPage(1);
  }, [location.pathname])

  return (
    <>
    {/* 정렬 네비게이션 */}
    <SmallNav data={[
        {text: 'root', path: '/drafts'},
        {text: 'Best', path: '/drafts/best'},
        {text: 'All', path: '/drafts/all'}
      ]}
        isSearch={true} loc={0} />

    {/* 도안 업로드 버튼 */}
    {getCookie('tattooist_id') && (
      <GoUploadBtn type="draft" text="도안 등록" filter="draft" />
    )}

    {/* 도안 목록 */}
    <ContentsDiv>
      <Outlet context={{ page }} />

    {/* 페이지네이션 */}
      <Pagination
        page={page} setPage={setPage}
        pages={pages} setPages={setPages}
        items={12}
      />
    </ContentsDiv>
    </>
  );
};

export default ShowDraftList;