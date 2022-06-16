import axios from 'axios';
import React, { useState, useEffect } from 'react';
import ShowDraftList from './ShowDraftList';

const BestDrafts = ({ apiUrl }) => {
  const [drafts, setDrafts] = useState([]);

  const sendRequest = async() => {
    const res = await axios.post(`${apiUrl}/`, {});
    console.log(res);
  }

  // useEffect(() => {
  //   sendRequest();
  // }, []);

  return (
    <>
      <ShowDraftList text={'Best Drafts'} drafts={[]} tattooist={false} />    
    </>
  );
};

export default BestDrafts;