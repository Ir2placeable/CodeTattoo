import React, { memo, useEffect } from "react";
import { useState } from "react";
import {
  DetailArtworkImg,
  DetailArtworkImgBox,
  DetailArtworkImgHover,
} from "../../../styledComponents";
import { useLocation, useNavigate } from "react-router-dom";
import { useCallback } from "react";

const DetailArtwork = ({ artwork }) => {
  const [hover, setHover] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const goDetail = () => {
    const [, , tattooist_id] = location.pathname.split("/");
    navigate(`/artwork/${artwork.artwork_id}/${tattooist_id}`);
  };

  const onMouseEnter = useCallback(() => {
    setHover(true);
  }, []);

  const onMouseLeave = useCallback(() => {
    setHover(false);
  }, []);

  return (
    <>
      <DetailArtworkImgBox
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        onClick={goDetail}
      >
        <DetailArtworkImg src={artwork.image} />
        {hover && (
          <DetailArtworkImgHover>
            <div>{artwork.cost} 원</div>
          </DetailArtworkImgHover>
        )}
      </DetailArtworkImgBox>
    </>
  );
};

export default React.memo(DetailArtwork);
