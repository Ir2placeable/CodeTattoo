import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ShowDraftList from './ShowDraftList';
import { DraftListBigDiv } from '../styledComponents';

import Pagination from './Pagination';

const AllDrafts = ({ apiUrl }) => {
  const [drafts, setDrafts] = useState([]);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState([]);

  const sendRequest = async() => {
    const res = await axios.get(`${apiUrl}/draft/browse/all/${page}`);
    console.log(res);
    setDrafts(res.data.drafts);
  };

  useEffect(() => {
    sendRequest();
  }, [page]);

  return (
    <>
      <DraftListBigDiv>
        <ShowDraftList text={'All Drafts'} drafts={drafts} tattooist={false} />

        <div  style={{backgroundColor: 'aqua'}}>
          <Pagination 
            apiUrl={apiUrl}
            page={page} 
            setPage={setPage} 
            pages={pages}
            setPages={setPages}/>
        </div>
      </DraftListBigDiv>
    </>
  );
};

export default AllDrafts;