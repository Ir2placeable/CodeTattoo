import axios from 'axios';
import React, { useState, useEffect } from 'react';
import ShowDraftList from './ShowDraftList';
import { DraftListBigDiv } from '../styledComponents';
import Pagination from './Pagination';

const RecentDrafts = ({ apiUrl, cookies, setCookie, removeCookie }) => {
  const [drafts, setDrafts] = useState([]);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState([]);

  const sendRequest = async() => {
    const res = await axios.get(`${apiUrl}/draft/recent/${page}`);
    console.log(res);
    setDrafts(res.data.drafts);
  };

  useEffect(() => {
    sendRequest();
  }, [page]);
  
  return (
    <>
      <DraftListBigDiv>
        <ShowDraftList cookies={cookies} text={'Recent Drafts'} drafts={drafts} tattooist={false} setCookie={setCookie} removeCookie={removeCookie} />

        <Pagination 
            apiUrl={apiUrl}
            page={page} 
            setPage={setPage} 
            pages={pages}
            setPages={setPages}/>
      </DraftListBigDiv>
    </>
  );
};

export default RecentDrafts;