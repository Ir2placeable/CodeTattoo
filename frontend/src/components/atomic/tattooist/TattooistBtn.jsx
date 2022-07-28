import React from "react";
import { TattooistButton } from "../../../styledComponents";

const TattooistBtn = ({ event, content, size }) => {
  return (
    <>
      <TattooistButton size={size} onClick={event}>
        {content}
      </TattooistButton>
    </>
  );
};

export default React.memo(TattooistBtn);
