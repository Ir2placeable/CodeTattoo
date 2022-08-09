import React, { memo } from 'react';
import { useParams } from 'react-router-dom';
import DraftList from './DraftList';

const DraftSearch = memo(() => {
  const params = useParams();
  const title = params.title;

  return (
    <>
      <div>
        <div>
          {title}에 대한 검색결과 입니다. 
        </div>
        <DraftList filter="drafts/search" />
      </div>
    </>
  );
});

export default DraftSearch;