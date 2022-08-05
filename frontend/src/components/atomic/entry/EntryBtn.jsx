import React from 'react';
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { EntryBtnDiv } from '../../../styledComponents';

const EntryBtn = ({ text }) => {
  const navigate = useNavigate();
  const onClick = useCallback(() => {
    if(text === '로그인'){
      navigate('/login');
    } else if(text === '회원가입'){
      navigate('/register');
    } else if(text === '둘러보기'){
      navigate('/drafts/best')
    }
  }, []);

  return (
    <>
      <EntryBtnDiv onClick={onClick}>
        {text}
      </EntryBtnDiv>
    </>
  );
};

export default EntryBtn;