import React from "react";
import {
  TattooistMainBox,
  TattooistContainer,
  TattooistControlDisabled,
  ListDiv,
  EmptyBox,
} from "../../styledComponents";
import Tattooist from "../organisms/tattooist/Tattooist";
import TattooistControlBox from "../organisms/tattooist/TattooistControlBox";
import { useOutletContext } from "react-router-dom";
import { getCookie } from "../../config/cookie";
import useTattooistList from "../../hooks/useTattooistList";

/**
 * 상위 컴포넌트 === ShowTattooist.jsx
 * 타투이스트 목록 템플릿 
 * @param {String} filter 추천순/ 최신순 
 */

const TattooistList = ({ filter }) => {
  // 페이지네이션
  const { page } = useOutletContext();

  // 타투이스트 목록 데이터
  const tattooists = useTattooistList({
    filter: filter,
    page: page,
  });
  return (
    <>
      <ListDiv>
        {tattooists.length === 0 ? (
          <EmptyBox>
            {filter === "tattooists/search"
              ? "검색 결과가 없습니다."
              : "아직 타투이스트가 없습니다."}
          </EmptyBox>
        ) : (
          <TattooistMainBox>
            {tattooists &&
              tattooists.map((tattooist) => (
                <TattooistContainer key={tattooist.tattooist_id}>
                  {getCookie("tattooist_id") ? (
                    <>
                    <TattooistControlDisabled/>
                    <Tattooist tattooist={tattooist} />
                    </>
                  ) : (
                    <>
                    <Tattooist tattooist={tattooist} />
                    <TattooistControlBox tattooist={tattooist} />
                    </>
                  )}
                </TattooistContainer>
              ))}
          </TattooistMainBox>
        )}
      </ListDiv>
    </>
  );
};

export default TattooistList;
