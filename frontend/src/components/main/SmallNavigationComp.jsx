import React, { useState, useEffect } from "react";
import {
  SmallNavigation,
  SmallNavigationBtn,
  SearchInput,
  SearchIconStyle,
} from "../../styledComponents";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { useNavigate, useLocation } from "react-router-dom";

// searchBox(boolean): 검색창 유무
// location(int, 0~3): 네비게이션 위치
// data = [{ text: '버튼 텍스트', path: '눌렀을 때 이동할 경로'}, ... ]
// data[0] = {text: '루트', path: '/draft 또는 /tattooist ...'}
// data[1] = {text: 'Best', path: '/draft/best'}
const SmallNavigationComp = ({ data, searchBox, location }) => {
  const boxLocation = {
    left: `calc((1300 / 4) * ${location}px)`,
  };

  const [firstBtn, setFirstBtn] = useState(false);
  const [secondBtn, setSecondBtn] = useState(false);
  const [searchInput, setSearchInput] = useState("");

  const navigate = useNavigate();
  const currLocation = useLocation();

  useEffect(() => {  // 버튼 스타일 세팅
    const path = currLocation.pathname;

    if (path === data[0].path || path === data[1].path) {
      setFirstBtn(true);

      if (path === data[0].path) {
        navigate(data[1].path);
      }
    } else if (path === data[2].path) {
      setSecondBtn(true);
    }
  }, []);

  const onBtnClick = (e) => {
    setSearchInput("");
    // e.target.id : 경로 : /draft/best
    if (e.target.id === data[1].path) {
      setFirstBtn(true);
      setSecondBtn(false);
      //navigate(data[1].path);
      window.location.replace(data[1].path);
    } else if (e.target.id === data[2].path) {
      setFirstBtn(false);
      setSecondBtn(true);
      //navigate(data[2].path);
      window.location.replace(data[2].path)
    }
  };

  const onChange = (e) => {
    setSearchInput(e.target.value);
  };
  const goSearch = () => {
    if (!searchInput) {
      alert("검색어를 입력해주세요.");
    } else {
      setFirstBtn(false);
      setSecondBtn(false);
      //navigate(`${data[0].path}/search/${searchInput}`);
      window.location.replace(`${data[0].path}/search/${searchInput}`);
    }
  };
  const onKeyUp = (e) => {
    if(e.key === 'Enter'){
      goSearch();
    }
  }

  const setStyle = (text) => {
    if (
      (text === data[1].text && firstBtn) ||
      (text === data[2].text && secondBtn)
    ) {
      return {
        color: "black",
      };
    }
  };

  return (
    <>
      <SmallNavigation style={boxLocation}>

        {searchBox && (
          <SmallNavigationBtn>
            <SearchInput
              type="text"
              placeholder="Search"
              value={searchInput}
              onChange={onChange}
              onKeyUp={onKeyUp}
            />
            <FontAwesomeIcon
              style={SearchIconStyle}
              icon={faMagnifyingGlass}
              onClick={goSearch}
            />
          </SmallNavigationBtn>
        )}
      </SmallNavigation>
    </>
  );
};

export default SmallNavigationComp;
