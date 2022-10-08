import React, { memo } from 'react';
import { useParams } from 'react-router-dom';
import DraftList from './DraftList';
import { SearchResText } from '../../styledComponents';


/**
 * 상위 컴포넌트 === ShowDraftList.jsx
 * 도안 목록 템플릿 (검색)
 */
const DraftSearch = memo(() => {
  const params = useParams();
  const title = params.title;
  return (
    <>
      
        <SearchResText>
          '{title}'에 대한 검색결과 입니다. 
        </SearchResText>

        <DraftList filter="drafts/search/0" title={title} />
      
    </>
  );
});

export default DraftSearch;