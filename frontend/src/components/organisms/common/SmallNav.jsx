import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { SmallNavigation } from "../../../styledComponents";
import SmallNavBtn from "../../atomic/common/SmallNavBtn";
import NavSearch from "../../atomic/common/NavSearch";

/** 도안 목록, 타투이스트 목록 페이지/ 네비게이션바 
 * @param {Array} data 버튼 텍스트
 * @param {Boolean} isSearch 검색 여부
 * @param {Number} loc 네비게이션 위치 
 * @returns 
 */
const SmallNav = ({ data, isSearch, loc }) => {
  const boxLoation = {
    left: `calc((1300/3) * ${loc}px)`,
  };
  // 네비게이션 버튼 선택 여부
  const [firstBtn, setFirstBtn] = useState(false);
  const [secondBtn, setSecondBtn] = useState(false);
  // 검색 키워드
  const [search, setSearch] = useState("");

  const location = useLocation();
  useEffect(() => {
    const path = location.pathname;

    if (path === data[0].path || path === data[1].path) {
      setFirstBtn(true);
    } else if (path === data[2].path) {
      setSecondBtn(true);
    } else {
      setFirstBtn(false);
      setSearch('');
    }
  }, [location.pathname]);

  const navigate = useNavigate();
  // URL 이동
  const onClick = (e) => {
    setSearch("");
    const path = e.target.id;

    if (path === data[1].path) {
      setFirstBtn(true);
      setSecondBtn(false);
      navigate(data[1].path);
    } else if (path === data[2].path) {
      setFirstBtn(false);
      setSecondBtn(true);
      navigate(data[2].path);
    }
  };
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
      <SmallNavigation style={boxLoation}>
        {data.map((_data, idx) => {
          if (idx > 0) {
            return (
              <SmallNavBtn
                key={idx}
                text={_data.text}
                path={_data.path}
                onClick={onClick}
                setStyle={setStyle}
              />
            );
          }
        })}

        {isSearch && (
          <NavSearch
            path={data[0].path}
            search={search}
            setSearch={setSearch}
          />
        )}
      </SmallNavigation>
    </>
  );
};

export default React.memo(SmallNav);
