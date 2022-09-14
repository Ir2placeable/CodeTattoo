import React from 'react';

import EntryBtn from '../../atomic/entry/EntryBtn';

/** 상위 컴포넌트 === ShowEntry.jsx
 * 엔트리 페이지 / 엔트리 버튼
 */

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