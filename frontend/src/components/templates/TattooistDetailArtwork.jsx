import React from "react";
import { useOutletContext } from "react-router-dom";
import { GridDiv } from "../../styledComponents";
import DetailArtwork from "../organisms/tattooist/DetailArtwork";

/** 
 * 상위 컴포넌트 === ShowTattooistDetail.jsx
 * 타투이스트 작업물 목록 템플릿 
 */
const TattooistDetailArtwork = () => {
  // 작업물 데이터
  const items = useOutletContext();
  return (
    <>
      <GridDiv>
        {items &&
          items.map((artwork) => (
            <>
              <DetailArtwork key={artwork.artwork_id} artwork={artwork} />
            </>
          ))}
      </GridDiv>
    </>
  );
};

export default TattooistDetailArtwork;
