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

const TattooistList = ({ filter }) => {
  const { page } = useOutletContext();

  const tattooists = useTattooistList({
    filter: filter,
    page: page,
  });

  console.log(tattooists)

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
                  <Tattooist tattooist={tattooist} />
                  {getCookie("tattooist_id") ? (
                    // <TattooistControlDisabled />
                    <></>
                  ) : (
                    <TattooistControlBox tattooist={tattooist} />
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
