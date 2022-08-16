import React, { useCallback, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  ProfileImg,
  TattooistInfoBox,
  TattooistInfo,
  ProfileImgIcon,
  TattooistImgHover,
  TattooistImgBox,
} from "../../../styledComponents";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

const Tattooist = ({ tattooist }) => {
  const tattooist_id = tattooist.tattooist_id;
  const navigate = useNavigate();
  const goDetail = useCallback(() => {
    navigate(`/tattooist/${tattooist_id}/draft`);
  }, [tattooist_id]);

  const [hover, setHover] = useState(false);

  const onMouseEnter = useCallback(() => {
    setHover(true);
  }, []);

  const onMouseLeave = useCallback(() => {
    setHover(false);
  }, []);
  return (
    <>
      <TattooistImgBox
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        onClick={goDetail}
      >
        {tattooist.image ? (
          <ProfileImg size="profile" src={tattooist.image} alt={tattooist_id} />
        ) : (
          <ProfileImgIcon size="profile">
            <FontAwesomeIcon style={{ fontSize: "100px" }} icon={faUser} />
          </ProfileImgIcon>
        )}
        {hover && (
          <TattooistImgHover>{tattooist.followers} followers</TattooistImgHover>
        )}
      </TattooistImgBox>
      <TattooistInfoBox>
        <TattooistInfo>Nickname : {tattooist.nickname}</TattooistInfo>
        <TattooistInfo>Office : {tattooist.location}</TattooistInfo>
        <TattooistInfo>Specialize : {tattooist.specialize}</TattooistInfo>
      </TattooistInfoBox>
    </>
  );
};

export default React.memo(Tattooist);
