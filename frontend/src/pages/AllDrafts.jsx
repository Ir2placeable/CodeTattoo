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
      {/* {drafts.map(draft => (
        <div key={draft._id}>
          <p>{draft.title}</p>
          <img style={{objectFit: 'contain'}} width={`${draft.image.width}px`} height={`${draft.image.height}px`} src={draft.image.url} alt={draft.title} />
        </div>
      ))} */}
      <ShowDraftList text={'All Drafts'} drafts={drafts} />
    </>
  );
};

export default AllDrafts;