import axios from 'axios';
import React, { useState, useEffect } from 'react';
import ShowDraftList from './ShowDraftList';

import { DraftListBigDiv } from '../styledComponents';
import Pagination from './Pagination';

const BestDrafts = ({ apiUrl, cookies }) => {
  const [drafts, setDrafts] = useState([]);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState([]);

  const sendRequest = async() => {
    const res = await axios.get(`${apiUrl}/draft/best/${page}`);
    //console.log(res);
    setDrafts(res.data.drafts)
  }

  useEffect(() => {
    sendRequest();
  }, []);

  return (
    <>
    <DraftListBigDiv>
      <ShowDraftList cookies={cookies} text={'Best Drafts'} drafts={drafts} tattooist={false} />

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

export default BestDrafts;