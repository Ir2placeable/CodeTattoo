import React, { useState } from 'react';
import DraftList from '../components/templates/DraftList';
import Pagination from '../components/organisms/common/Pagination';
import { ContentsDiv } from '../styledComponents';

const ShowDraftList = ({ filter }) => {
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState([]);

  return (
    <>

    <ContentsDiv>
      <DraftList filter={filter} page={page} />
      <Pagination filter="drafts"
        page={page} setPage={setPage}
        pages={pages} setPages={setPages}
      />
    </ContentsDiv>
    </>
  );
};

export default ShowDraftList;