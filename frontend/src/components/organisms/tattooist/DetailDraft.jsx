import React from "react";
import { useCallback } from "react";
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
    navigate(`/draft/${draft.draft_id}/detail`);
  };

  const onMouseEnter = useCallback(() => {
    setHover(true);
  }, [hover]);

  const onMouseLeave = useCallback(() => {
    setHover(false);
  }, [hover]);

  return (
    <>
      <DetailDraftImgBox
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        onClick={goDetail}
      >
        <DetailDraftImg src={draft.image} onClick={goDetail} />
        {hover && (
          <DetailDraftImgHover>
            <div>{draft.like} likes</div>
          </DetailDraftImgHover>
        )}
      </DetailDraftImgBox>
    </>
  );
};

export default React.memo(DetailDraft);
