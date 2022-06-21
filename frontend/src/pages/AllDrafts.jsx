import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ShowDraftList from './ShowDraftList';
import { DraftListBigDiv } from '../styledComponents';

import Pagination from './Pagination';

const AllDrafts = ({ apiUrl, cookies }) => {
  const [drafts, setDrafts] = useState([]);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState([]);

  const sendRequest = async() => {
    const res = await axios.get(`${apiUrl}/draft/all/${page}`);
    console.log(res);
    setDrafts(res.data.drafts);
  };

  useEffect(() => {
    sendRequest();
  }, [page]);

  return (
    <>
      <DraftListBigDiv>
        <ShowDraftList cookies={cookies} text={'All Drafts'} drafts={drafts} tattooist={false} />

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

export default AllDrafts;