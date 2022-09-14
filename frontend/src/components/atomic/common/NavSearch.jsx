import React, { useCallback } from 'react';
import { 
  SmallNavigationBtn, SearchInput,
  SearchIconStyle
} from '../../../styledComponents';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

/**
 * 상위 컴포넌트 === SmallNav.jsx
 * 서브 네비게이션 검색어 입력창 컴포넌트
 * @param {string} path
 * @param {string} search
 * @param {Function} setSearch
 */
const NavSearch = ({ path, search, setSearch }) => {

  const navigate = useNavigate();
  const goSearch = () => {
    if(!search){
      alert('검색어를 입력해주세요!');
    } else {
      //window.location.replace(`${path}/search/${search}`);
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