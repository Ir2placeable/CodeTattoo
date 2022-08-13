import React from "react";

import {
  DraftHeartBox,
  SmallDraftImg,
  SmallDraftInfoBox,
  SmallDraftTitle,
} from "../../../styledComponents";

import HeartIcon from "../../atomic/draft/HeartIcon";

const SmallDraft = ({ draft }) => {
  console.log("Small Draft", draft); 
  return (
    <>
      <SmallDraftImg src={draft.image} alt={draft.draft_id} />
      <SmallDraftInfoBox>
        <SmallDraftTitle>{draft.title}</SmallDraftTitle>
        <DraftHeartBox>
          <HeartIcon isScraped={draft.isScraped} draft_id={draft.draft_id} />
        </DraftHeartBox>
      </SmallDraftInfoBox>
    </>
  );
};

export default SmallDraft;
