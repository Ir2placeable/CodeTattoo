import axios from 'axios';
import React, { useState } from 'react';
import ShowDraftList from './ShowDraftList';

const RecentDrafts = ({ apiUrl }) => {
  const [drafts, setDrafts] = useState([]);

  const sendRequest = async() => {
    const res = await axios.post();
  }

  // useEffect(() => {
  //   sendRequest();
  // }, []);
  
  return (
    <>
      <ShowDraftList text={'Recent Drafts'} drafts={[]} />
    </>
  );
};

export default RecentDrafts;