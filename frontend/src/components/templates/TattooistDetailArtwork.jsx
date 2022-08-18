import React from "react";
import { useOutletContext } from "react-router-dom";
import { GridDiv } from "../../styledComponents";
import DetailArtwork from "../organisms/tattooist/DetailArtwork";

const TattooistDetailArtwork = () => {
  const items = useOutletContext();

  return (
    <>
      <GridDiv>
        {items && 
          items.map((artwork) => {
            <DetailArtwork key={artwork.artwork_id} artwork={artwork} />
          })}
      </GridDiv>
    </>
  );
};

export default TattooistDetailArtwork;
