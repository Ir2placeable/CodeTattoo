import React, { memo } from 'react';
import { useParams } from 'react-router-dom';
import DraftList from './DraftList';
import { SearchResText } from '../../styledComponents';

const DraftSearch = memo(() => {
  const params = useParams();
  const title = params.title;

  return (
    <>
      <div>
        <SearchResText>
          '{title}'에 대한 검색결과 입니다. 
        </SearchResText>

        <DraftList filter="drafts/search" title={title} />
      </div>
    </>
  );
});

export default DraftSearch;