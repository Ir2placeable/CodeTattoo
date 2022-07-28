import React from 'react';

import EntryBtn from '../../atomic/entry/EntryBtn';

const EntryBtns = () => {
  return (
    <>
      <EntryBtn text="로그인" />
      <EntryBtn text="회원가입" />
      <EntryBtn text="둘러보기" />
    </>
  );
};

export default EntryBtns;