import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ShowDraftList from './ShowDraftList';

const AllDrafts = ({ apiUrl }) => {
  const [drafts, setDrafts] = useState([]);

  const sendRequest = async() => {
    const res = await axios.post(`${apiUrl}/draft/browse`, {});
    console.log(res);
    setDrafts(res.data.drafts);
  };

  useEffect(() => {
    sendRequest();
  }, []);
  return (
    <>
      <ShowDraftList text={'All Drafts'} drafts={drafts} />
    </>
  );
};

export default AllDrafts;