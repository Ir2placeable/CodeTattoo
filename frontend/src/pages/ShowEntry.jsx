import React from 'react';
import EntryBtns from '../components/organisms/entry/EntryBtns';
import { EntryDiv } from '../styledComponents';

/* 시작 페이지 */
const ShowEntry = () => {
  return (
    <>
    {/* 엔트리 */}
      <EntryDiv>
        <EntryBtns />
      </EntryDiv>
    </>
  );
};

export default ShowEntry;