import React, { useState } from 'react';
import ShowDraftList from './ShowDraftList';

const TattoistDrafts = ({ apiUrl }) => {

  return (
    <>
      <ShowDraftList text="Tattooist drafts" drafts={[]} />
    </>
  );
};

export default TattoistDrafts;