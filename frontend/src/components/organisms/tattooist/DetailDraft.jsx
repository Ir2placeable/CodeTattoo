import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  DetailDraftImg,
  DetailDraftImgBox,
  DetailDraftImgHover,
} from "../../../styledComponents";

const DetailDraft = ({ draft }) => {
  const [hover, setHover] = useState(false);

  const navigate = useNavigate();
  const goDetail = () => {
    navigate(`/draft/${draft.draft_id}/detail`)
    console.log(draft)
  };

  return (
    <>
      <DetailDraftImgBox
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        onClick={goDetail}
      >
        <DetailDraftImg src={draft.image} />
        {hover && <DetailDraftImgHover>{draft.like} likes</DetailDraftImgHover>}
      </DetailDraftImgBox>
    </>
  );
};

export default React.memo(DetailDraft);
