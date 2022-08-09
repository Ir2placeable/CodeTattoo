import React, { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import {
  ProfileImg,
  TattooistInfoBox,
  TattooistInfo,
} from "../../../styledComponents";

const Tattooist = ({ tattooist }) => {
  console.log("Tattooist");
  const navigate = useNavigate();

  const goDetail = useCallback(() => {
    navigate(`/tattooist/${tattooist.tattooist_id}/draft`);
  }, []);

  return (
    <>
      <ProfileImg
        size="profile"
        src={tattooist.image}
        alt={tattooist.tattooist_id}
        onClick={goDetail}
      />
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
