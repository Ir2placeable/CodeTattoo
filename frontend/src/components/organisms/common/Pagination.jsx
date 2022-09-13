import React, { useEffect, useState } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowLeft,
  faArrowRight,
} from '@fortawesome/free-solid-svg-icons';
import { 
  PageDiv, PageBox, CurrentPage, PagenationDiv 
} from '../../../styledComponents'
import usePagination from '../../../hooks/usePagination';
import { useLocation } from 'react-router-dom';

const Pagination = ({ page, setPage, pages, setPages, items }) => {
  const location = useLocation();
  
  const count = usePagination({
    filter: location.pathname
  });

  useEffect(() => {
    const lastPage = Math.ceil(count / items);
    const temp = [];

    for(let i = 1; i <= lastPage; i++){
      temp.push(i);
    }
    setPages(temp);
  }, [count]);

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [page])

  return (
    <>
    <PagenationDiv>
      <PageDiv>
        {/* 현재 페이지가 1보다 크면 ArrowLeft 보여주기 */}
        { page > 1 && (
          <PageBox onClick={()=>{
            if(page > 1){
              setPage(page-1);
            }
          }}>
            <FontAwesomeIcon icon={faArrowLeft} />
          </PageBox>
        )}

        {/* pagination */}
        {pages.map(pageNum => (
          <PageBox key={pageNum} onClick={()=>{setPage(pageNum)}}>
            {pageNum}
          </PageBox>
        ))}


        {/* ArrowRight */}
        {page < pages.length && (
          <PageBox onClick={() => {
            if(page < pages.length){
              setPage(page+1);
            }
          }}>
            <FontAwesomeIcon icon={faArrowRight} />
          </PageBox>
        )}
      </PageDiv>

      <PageDiv>
          <CurrentPage> {page} / {pages.length === 0 ? 1 : pages.length} </CurrentPage>
      </PageDiv>
    </PagenationDiv>
    </>
  );
};

export default React.memo(Pagination);