import React from "react";
import { useEffect, useState } from "react";
import {
  DraftHeartBox,
  SmallDraftImg,
  SmallDraftInfoBox,
  SmallDraftTitle,
} from "../../../styledComponents";
import HeartIcon from "../../atomic/draft/HeartIcon";

/** 상위 컴포넌트 === DraftDetail.jsx 
 * 도안 상세 페이지/ 도안
 * @param {Object} draft 도안 데이터 
 */

const SmallDraft = ({ draft }) => {
  // 로딩 여부
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (draft) {
      setLoading(false);
    }
  }, [draft]);

  return (
    <>
      {/* 도안 세부 정보  */}
      {loading ? (
        <div>loading...</div>
      ) : (
        <>
          <SmallDraftImg src={draft.image} alt={draft.draft_id} />
          <SmallDraftInfoBox>
            <SmallDraftTitle>{draft.title}</SmallDraftTitle>
            <DraftHeartBox>
              <HeartIcon
                isScraped={draft.isScraped}
                draft_id={draft.draft_id}
              />
            </DraftHeartBox>
          </SmallDraftInfoBox>
        </>
      )}
    </>
  );
};

export default React.memo(SmallDraft);
