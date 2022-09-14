import React from 'react';
import { 
  SmallNavigationBtn, SearchInput,
  SearchIconStyle
} from '../../../styledComponents';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

/** 상위 컴포넌트 === SmallNav.jsx
 * 타투이스트 목록, 도안 목록 페이지 / 검색창
 * @param {String} path 경로
 * @param {String} Search 검색어
 * @param {State} setSearch 
 */

const NavSearch = ({ path, search, setSearch }) => {

  const navigate = useNavigate();
  
  const goSearch = () => {
    if(!search){
      alert('검색어를 입력해주세요!');
    } else {
      navigate(`${path}/search/${search}`)
    }
  }

  const onChange = (e) => {
    setSearch(e.target.value);
  }
  const onKeyUp = (e) => {
    if(e.key === 'Enter'){
      goSearch();
    }
  }

  return (
    <>
      <SmallNavigationBtn>
        <SearchInput 
          type="text"
          placeholder='Search'
          value={search}
          onChange={onChange}
          onKeyUp={onKeyUp}
        />
        <FontAwesomeIcon 
          style={SearchIconStyle}
          icon={faMagnifyingGlass}
          onClick={goSearch}
        />
      </SmallNavigationBtn>
    </>
  );
};

export default React.memo(NavSearch);