import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as heartReqular } from '@fortawesome/free-regular-svg-icons';
import useHeartClick from '../../../hooks/useHeartClick';
import { getCookie } from '../../../config/cookie';

const heartIconStyle = {
  fontSize: `35px`,
  cursor: 'pointer',
  color: 'red'
}

/** 상위 컴포넌트 === Draft.jsx && SmallDraft.jsx
 * 도안 목록 페이지, 도안 상세 페이지 / 스크랩 버튼
 * @param {Boolean} isScraped 스크랩 여부
 * @param {String} draft_id 도안 아이디 
 */

const HeartIcon = ({ isScraped, draft_id }) => {
  const [heartClick, setHeartClick] = useState(false);
  const [scrap, unscrap] = useHeartClick({ draft_id });

  useEffect(() => {
    if(isScraped){
      setHeartClick(true);
    }
  }, [isScraped])

  const onHeartClick = () => {
    if(!getCookie('user_id')){
      // 로그인 안 한 유저이거나 타투이스트일 때 스크랩 기능 지원 x
      alert('스크랩 기능은 유저 로그인 상태에서 가능합니다.')
      return;
    }
  
    setHeartClick(heartClick ? false : true);
    if(heartClick){
      // 스크랩 해제
      setHeartClick(false);
      unscrap();
    } else {
      // 스크랩
      setHeartClick(true);
      scrap();
    }
  }

  return (
    <>
      <FontAwesomeIcon
        onClick={onHeartClick}
        style={heartIconStyle}
        icon={heartClick ? faHeart : heartReqular}  />
    </>
  );
};

export default React.memo(HeartIcon);