import React from "react";

import {
  DraftHeartBox,
  DraftImg,
  SmallDraftInfoBox,
  SmallDraftTitle,
} from "../../../styledComponents";

const SmallDraft = ({ draft }) => {
  console.log("Small Draft", draft);
  return (
    <>
      <DraftImg src={draft.image} alt={draft.draft_id} />
      <SmallDraftInfoBox>
        <SmallDraftTitle>{draft.title}</SmallDraftTitle>
        <DraftHeartBox style={{ padding: "10px" }}>하트</DraftHeartBox>
      </SmallDraftInfoBox>
    </>
  );
};

export default SmallDraft;
