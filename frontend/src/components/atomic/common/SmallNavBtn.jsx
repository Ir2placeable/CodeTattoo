import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { SmallNavigationBtn } from '../../../styledComponents';

const SmallNavBtn = ({ path, text, onClick, setStyle }) => {

  return (
    <>
      <SmallNavigationBtn
        id={path}
        onClick={onClick}
        style={setStyle(text)}
      >
        {text}
      </SmallNavigationBtn>
    </>
  );
};

export default React.memo(SmallNavBtn);