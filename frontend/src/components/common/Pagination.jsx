import React, { useState, useEffect, useCallback } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowLeft,
  faArrowRight,
} from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { PageDiv, PageBox, CurrentPage, PagenationDiv } from '../../styledComponents'
import { useLocation } from 'react-router-dom';
import { APIURL } from '../../config/key';

const Pagination = ({ filter, cookies , 
  page, setPage, pages, setPages }) => {

  const getPageNum = async() => {
    let _id = cookies.user_id;
    let _name = 'user'
    if(cookies.tattooist_id){
      _id = cookies.tattooist_id;
      _name = 'tattooist'
    }

    const res = await axios.get(`${APIURL}/main/${filter}/init/1/?${_name}_id=${_id}`);
    
    if(!res.data.success){
      console.log('pagination fail')
      return;
    }

    const count = res.data.count;
    //const count = 23;
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
    <PagenationDiv>
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

    <PageDiv>
        <CurrentPage> {page} / {pages.length === 0 ? 1 : pages.length} </CurrentPage>
    </PageDiv>
    </PagenationDiv>
    </>
  );
};

export default React.memo(Pagination);