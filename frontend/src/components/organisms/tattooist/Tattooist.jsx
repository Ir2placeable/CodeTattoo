import React, { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import {
  ProfileImg,
  TattooistInfoBox,
  TattooistInfo,
  ProfileImgIcon
} from "../../../styledComponents";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

const Tattooist = ({ tattooist }) => {
  const tattooist_id = tattooist.tattooist_id;
  const navigate = useNavigate();
  const goDetail = useCallback(() => {
    navigate(`/tattooist/${tattooist_id}/draft`);
  }, [tattooist_id]);

  return (
    <>
      {tattooist.image ? (
        <ProfileImg
          size="profile"
          src={tattooist.image}
          alt={tattooist_id}
          onClick={goDetail}
        />
      ) : (
        <ProfileImgIcon size="profile">
          <FontAwesomeIcon 
            style={{fontSize: '100px'}} icon={faUser} />
        </ProfileImgIcon>
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
