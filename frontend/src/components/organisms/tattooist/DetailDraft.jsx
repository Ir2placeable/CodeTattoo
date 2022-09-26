import React from "react";
import { useCallback } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { goDraftDetail } from "../../../config/navigate";
import {
  DetailDraftImg,
  DetailDraftImgBox,
  DetailDraftImgHover,
} from "../../../styledComponents";

/** 상위 컴포넌트 === TattooistDetailDraft.jsx 
 * 타투이스트 상세 페이지 / 도안
 * @param {Object} draft 도안 데이터
*/

const DetailDraft = ({ draft }) => {
  // Hover Style
  const [hover, setHover] = useState(false);

  // 도안 상세 페이지 이동
  const goDetail = () => {
    goDraftDetail(draft.draft_id);
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
