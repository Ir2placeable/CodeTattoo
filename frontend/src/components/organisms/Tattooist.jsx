import React from "react";
import {
  TattooistImg,
  TattooistInfoBox,
  TattooistInfo,
} from "../../styledComponents";

const Tattooist = ({ tattooist }) => {
  console.log("Tattooist");
  return (
    <>
      {tattooist.image ? (
        <TattooistImg
          src={tattooist.image}
          alt={tattooist.nickname}
          id={tattooist.tattooist_id}
        />
      ) : (
        <TattooistImg />
      )}
      <TattooistInfoBox>
        <TattooistInfo>Nickname : {tattooist.nickname}</TattooistInfo>
        <TattooistInfo>Office : {tattooist.location}</TattooistInfo>
        <TattooistInfo>Specialize : {tattooist.specialize}</TattooistInfo>
        <TattooistInfo>follwers : {tattooist.followers}</TattooistInfo>
      </TattooistInfoBox>
    </>
  );
};

export default React.memo(Tattooist);
