import React, { useCallback, useState } from 'react';
import { HeaderBtn, HeaderBtnHover } from '../../styledComponents';

import { getCookie } from '../../config/cookie';
import { useNavigate } from 'react-router-dom';

const GoMypage = () => {
  const [isHover, setIsHover] = useState(false);

  const navigate = useNavigate();

  const onClick = useCallback(() => {
    let _id = getCookie('user_id');
    let filter = 'user';

    if(_id === undefined){
      _id = getCookie('tattooist_id');
      filter = 'tattooist';
    }

    navigate(`/mypage/${filter}/${_id}`);
  }, []);

  return (
    <>
      <HeaderBtn
        onClick={onClick}
        onMouseEnter={() => { setIsHover(true) }}
        onMouseLeave={() => { setIsHover(false) }}
        style={isHover ? HeaderBtnHover : {}}
      >
        마이페이지
      </HeaderBtn>
    </>
  );
};

export default React.memo(GoMypage);