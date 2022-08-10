import React from "react";
import { useOutletContext } from "react-router-dom";
import { GridDiv } from "../../styledComponents";

import DetailDraft from "../organisms/tattooist/DetailDraft";

const TattooistDetailDraft = () => {
  const items = useOutletContext();

  return (
    <>
      <GridDiv>
        {items &&
          items.map((draft) => (
            <DetailDraft key={draft.draft_id} draft={draft} />
          ))}
      </GridDiv>
    </>
  );
};

export default TattooistDetailDraft;
