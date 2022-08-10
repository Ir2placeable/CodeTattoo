import React from "react";
import { useState } from "react";
import {
  DetailDraftImg,
  DetailDraftImgBox,
  DetailDraftImgHover,
} from "../../../styledComponents";

const DetailDraft = ({ draft }) => {
  const [hover, setHover] = useState(false);

  const goDetail = () => {};

  return (
    <>
      <DetailDraftImgBox
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        <DetailDraftImg src={draft.image} />
        {hover && <DetailDraftImgHover>{draft.like} likes</DetailDraftImgHover>}
      </DetailDraftImgBox>
    </>
  );
};

export default React.memo(DetailDraft);
