import React, { useCallback } from 'react';
import { 
  SmallNavigationBtn, SearchInput,
  SearchIconStyle
} from '../../../styledComponents';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

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
  const onKeyUp = useCallback((e) => {
    if(e.key === 'Enter'){
      goSearch();
    }
  }, []);

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