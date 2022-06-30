import React, { useState, useEffect } from 'react';
import { 
  ContentsDiv, SmallNavigation, SmallNavigationBtn,
  SearchInput, SearchIconStyle
} from '../../styledComponents';
import { APIURL } from '../../config/key';

import SmallNavigationComp from './SmallNavigationComp';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
const ShowDraftList = () => {
  const [isBest, setIsBest] = useState(false);
  const [isAll, setIsAll] = useState(false);
  const [input, setInput] = useState('');

  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    const path = location.pathname;

    if(path === '/draft'){
      setIsBest(true);
      navigate('/draft/best')
    } else if(path === '/draft/best'){
      setIsBest(true);
    } else if(path === '/draft/all') {
      setIsAll(true);
    }

  }, []);

  const onBtnClick = (e) => {
    setInput('');

    if(e.target.id === 'best'){
      setIsAll(false);
      setIsBest(true);
      navigate('/draft/best')
    } else {
      setIsAll(true);
      setIsBest(false);
      navigate('/draft/all')
    }
  }

  const onChange = (e) => {
    setInput(e.target.value)
  }
  const goSearch = () => {
    if(!input){
      alert('검색어를 입력해주세요.')
    } else {
      setIsAll(false);
      setIsBest(false);
      navigate(`/draft/search/${input}`)
    }
  }

  return (
    <>
      {/* <SmallNavigationComp texts={["Best", "All"]}
        searchBox={true} location={0} /> */}
      <SmallNavigation style={{left: 'calc((1300 / 4) * 0px)'}}>

        <SmallNavigationBtn
          id={"best"}
          onClick={onBtnClick}
          style={isBest ? {color: 'black'} : {}}
        >
          Best
        </SmallNavigationBtn>
        <SmallNavigationBtn
          id={"all"}
          onClick={onBtnClick}
          style={isAll ? {color: 'black'} : {}}
        >
          All
        </SmallNavigationBtn>
        <SmallNavigationBtn>
          <SearchInput
            type="text"
            placeholder='Search'
            value={input}
            onChange={onChange}
          />
          <FontAwesomeIcon 
          style={SearchIconStyle} icon={faMagnifyingGlass}
          onClick={goSearch} />
        </SmallNavigationBtn>

      </SmallNavigation>

      <ContentsDiv>
        <Outlet />
      </ContentsDiv>
    </>
  );
};

export default ShowDraftList;