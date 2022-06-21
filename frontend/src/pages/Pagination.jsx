import React, { useState, useEffect, useCallback } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowsRotate,
  faPenToSquare,
  faArrowLeft,
  faArrowRight,
} from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { PageDiv, PageBox, CurrentPage } from '../styledComponents'

const Pagination = ({ apiUrl, page, setPage, pages, setPages }) => {
  const getPageNum = async() => {
    const res = await axios.get(`${apiUrl}/draft/init/1`);
    //console.log(res.data.count);
    const count = res.data.count;
    const lastPage = Math.ceil(count / 16);
    const tempPages = [];

    for(let i = 1; i <= lastPage; i++){
      tempPages.push(i);
    }
    setPages(tempPages);
  }

  useEffect(() => {
    //console.log('get page count')
    getPageNum();
  }, []);

  return (
    <>
    <PageDiv>
        <CurrentPage> {page} / {pages.length} </CurrentPage>
    </PageDiv>

    <PageDiv>
      {/* 현재 페이지가 1보다 크면 ArrowLeft 보여주기 */}
      { page > 1 ? (
        <PageBox onClick={()=>{
          if(page > 1){
            setPage(page-1);
          }
        }}>
          <FontAwesomeIcon icon={faArrowLeft} />
        </PageBox>
      ) : (
        <div></div>
      )}

      {/* pagination */}
      {pages.map(pageNum => (
        <PageBox key={pageNum} onClick={()=>{setPage(pageNum)}}>
          {pageNum}
        </PageBox>
      ))}


      {/* ArrowRight */}
      {page < pages.length ? (
        <PageBox onClick={() => {
          if(page < pages.length){
            setPage(page+1);
          }
        }}>
          <FontAwesomeIcon icon={faArrowRight} />
        </PageBox>
      ) : (
        <div></div>
      )}
    </PageDiv>

    </>
  );
};

export default React.memo(Pagination);