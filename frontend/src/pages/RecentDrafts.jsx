import axios from 'axios';
import React, { useState, useEffect } from 'react';
import ShowDraftList from './ShowDraftList';
import { DraftListBigDiv } from '../styledComponents';
import Pagination from './Pagination';

const RecentDrafts = ({ apiUrl }) => {
  const [drafts, setDrafts] = useState([]);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState([]);

  const sendRequest = async() => {
    const res = await axios.get(`${apiUrl}/draft/browse/recent/${page}`);
    //console.log(res);
    setDrafts(res.data.drafts);
  };

  useEffect(() => {
    sendRequest();
  }, [page]);
  
  return (
    <>
      <DraftListBigDiv>
        <ShowDraftList text={'Recent Drafts'} drafts={drafts} tattooist={false} />

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