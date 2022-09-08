import React from "react";
import { useState } from "react";
import {
  DetailArtworkImg,
  DetailArtworkImgBox,
  DetailArtworkImgHover,
} from "../../../styledComponents";
const DetailArtwork = ({ artwork }) => {
  const [hover, setHover] = useState(false);

  const goDetail = () => {};

  console.log('artwork: ',artwork)

  return (
    <>
      <DetailArtworkImgBox
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        <DetailArtworkImg src={artwork.image} onClick={goDetail} />
        {hover && (
          <DetailArtworkImgHover>
            <div>{artwork.cost} 원</div>
            <div>{artwork.time}</div>
          </DetailArtworkImgHover>
        )}
      </DetailArtworkImgBox>
    </>
  );
};

export default DetailArtwork;
