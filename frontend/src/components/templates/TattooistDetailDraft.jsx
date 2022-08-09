import React from "react";
import { useOutletContext } from "react-router-dom";
import { GridDiv, DetailDraftImg } from "../../styledComponents";

const TattooistDetailDraft = () => {
  const { drafts } = useOutletContext();
  return (
    <>
      <GridDiv>
        {drafts &&
          drafts.map((draft) => (
            <DetailDraftImg key={draft.draft_id} src={draft.image} />
          ))}
      </GridDiv>
    </>
  );
};

export default TattooistDetailDraft;
