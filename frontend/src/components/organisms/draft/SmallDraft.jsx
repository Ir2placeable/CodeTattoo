import React from "react";
import { useEffect, useState } from "react";

import {
  DraftHeartBox,
  SmallDraftImg,
  SmallDraftInfoBox,
  SmallDraftTitle,
} from "../../../styledComponents";

import HeartIcon from "../../atomic/draft/HeartIcon";

const SmallDraft = ({ draft }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (draft) {
      // console.log("Small Draft", draft);
      // console.log('draft.isScraped: ',draft.isScraped)
      setLoading(false);
    }
  }, [draft]);

  return (
    <>
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
