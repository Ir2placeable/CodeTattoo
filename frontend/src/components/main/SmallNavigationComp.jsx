import React, { useState, useEffect } from 'react';
import { 
  SmallNavigation, SmallNavigationBtn,
  SearchInput, SearchIconStyle
} from '../../styledComponents';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { useNavigate, useLocation } from 'react-router-dom';
// texts(string): 버튼 텍스트
// searchBox(boolean): 검색창 유무
// location(int, 0~3): 네비게이션 위치
// [value, setValue] = useState({click: false, path: ''})
const SmallNavigationComp = ({ 
  texts, searchBox, location }) => {
  const [isClicked, setIsClicked] = useState({
    btn0: true,
    btn1: false
  })

  const boxLocation = {
    left: `calc((1300 / 4) * ${location}px)`
  }

  const onBtnClick = (e) => {
    //console.log(e.target.id)
    const idx = e.target.id;
    setIsClicked({
      btn0: false,
      btn1: false,
      [`btn${idx}`]: true
    })

    // 각 버튼 눌렀을 때의 Action
  }

  return (
    <>
      <SmallNavigation style={boxLocation}>

        {texts.map((text, idx) => (
          <SmallNavigationBtn 
            id={idx}
            key={text}
            onClick={onBtnClick}
            style={isClicked[`btn${idx}`] ? {color: 'black'} : {}}
          >
            {text}
          </SmallNavigationBtn>
        ))}
        {searchBox && (
          <SmallNavigationBtn>
            <SearchInput 
              type="text"
              placeholder='Search'
            />
            <FontAwesomeIcon style={SearchIconStyle} icon={faMagnifyingGlass} />
          </SmallNavigationBtn>
        )}

      </SmallNavigation>
    </>
  );
};

export default SmallNavigationComp;