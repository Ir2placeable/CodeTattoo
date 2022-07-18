import React from "react";
import {
  TattooistImg,
  TattooistInfoBox,
  TattooistInfo,
} from "../../styledComponents";

const Tattooist = ({ tattooist }) => {
  console.log("Tattooist is rendering");
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
        <TattooistInfo>Office : {tattooist.office}</TattooistInfo>
        <TattooistInfo>Specialize : {tattooist.spcialize}</TattooistInfo>
        <TattooistInfo>follwers : {tattooist.follow}</TattooistInfo>
      </TattooistInfoBox>
    </>
  );
};

export default React.memo(Tattooist);
