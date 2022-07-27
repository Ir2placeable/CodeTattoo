import React from "react";
import { TattooistMainBox, TattooistContainer } from "../../styledComponents";
import Tattooist from "../organisms/tattooist/Tattooist";
import TattooistControlBox from "../organisms/tattooist/TattooistControlBox";
import { useOutletContext } from "react-router-dom";

const TattooistList = () => {
  console.log("Tattooist List");
  const { tattooists } = useOutletContext();
  console.log(tattooists);
  return (
    <>
      <TattooistMainBox>
        {tattooists.map((tattooist) => (
          <TattooistContainer key={tattooist.tattooist_id}>
            <Tattooist tattooist={tattooist} />
            <TattooistControlBox tattooist={tattooist} />
          </TattooistContainer>
        ))}
      </TattooistMainBox>
    </>
  );
};

export default TattooistList;
