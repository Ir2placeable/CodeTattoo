import React from 'react';
import { 
  MyPageMenu, 
  MyPageMenuBtn,
  menuBtnClickedStyle,
} from '../styledComponents';
import { useState } from 'react';

const MyPageMenuComp = ({text1, text2 }) => {
  const [draftBtn, setDraftBtn] = useState(true);

  const onClick1 = () => {
    setDraftBtn(true)
  }
  const onClick2 = () => {
    setDraftBtn(false)
  }

  return (
    <>
      <MyPageMenu>
        <MyPageMenuBtn 
          style={draftBtn ? menuBtnClickedStyle : {}}
          onClick={onClick1}>
          {text1}
        </MyPageMenuBtn>
        <MyPageMenuBtn 
          style={draftBtn ? {} : menuBtnClickedStyle}
          onClick={onClick2}>
          {text2}
        </MyPageMenuBtn>
      </MyPageMenu>
    </>
  );
};

export default MyPageMenuComp;