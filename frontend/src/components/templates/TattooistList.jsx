import React from "react";
import {
  TattooistMainBox,
  TattooistContainer,
  TattooistControlDisabled,
} from "../../styledComponents";
import Tattooist from "../organisms/tattooist/Tattooist";
import TattooistControlBox from "../organisms/tattooist/TattooistControlBox";
import { useOutletContext } from "react-router-dom";
import { getCookie } from "../../config/cookie";

const TattooistList = () => {
  console.log("Tattooist List");
  const { tattooists } = useOutletContext();
  return (
    <>
      <TattooistMainBox>
        {tattooists &&
          tattooists.map((tattooist) => (
            <TattooistContainer key={tattooist.tattooist_id}>
              <Tattooist tattooist={tattooist} />
              {getCookie("tattooist_id") ? (
                <TattooistControlDisabled />
              ) : (
                <TattooistControlBox tattooist={tattooist} />
              )}
            </TattooistContainer>
          ))}
      </TattooistMainBox>
    </>
  );
};

export default TattooistList;
