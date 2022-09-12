import React from "react";
import {
  TattooistInfoTitle,
  StateText,
  StateContent,
} from "../../../styledComponents";

const ArtworkStateUnit = ({title, text}) => {
  return (
    <>
      <StateContent>
        <TattooistInfoTitle type="specialize">{title}</TattooistInfoTitle>
        <StateText>{text}</StateText>
      </StateContent>
    </>
  );
};

export default React.memo(ArtworkStateUnit);
