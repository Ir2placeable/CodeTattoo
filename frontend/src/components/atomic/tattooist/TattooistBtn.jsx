import React from "react";
import { TattooistButton } from "../../../styledComponents";

const TattooistBtn = ({ event, content }) => {
  return (
    <>
      <TattooistButton onClick={event}>{content}</TattooistButton>
    </>
  );
};

export default React.memo(TattooistBtn);
