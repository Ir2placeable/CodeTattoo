import React, { useCallback, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  ProfileImg,
  TattooistInfoBox,
  TattooistInfoTitle,
  TattooistInfoText,
  ProfileImgIcon,
  TattooistImgHover,
  TattooistImgBox,
  TattooistInfoUnitBox,
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

  // console.log(tattooist)

  return (
    <>
      <TattooistImgBox
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        onClick={goDetail}
      >
        {tattooist.image ? (
          <ProfileImg size="profile" src={tattooist.image} />
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

        <TattooistInfoUnitBox>
          {/* <TattooistInfoTitle>닉네임</TattooistInfoTitle> */}
          <TattooistInfoText>{tattooist.nickname}</TattooistInfoText>
        </TattooistInfoUnitBox>

        <TattooistInfoUnitBox>
          <TattooistInfoTitle type="location">
            위치
          </TattooistInfoTitle>
          <TattooistInfoText type="small">
            {tattooist.location}
          </TattooistInfoText>
          <TattooistInfoTitle type="specialize">
            특화분야
          </TattooistInfoTitle>
          <TattooistInfoText type="small">
            {tattooist.specialize}
          </TattooistInfoText>
          {/* <TattooistInfoTitle>위치</TattooistInfoTitle> */}
          {/* <TattooistInfoText>{tattooist.location}</TattooistInfoText> */}
        </TattooistInfoUnitBox>

        <TattooistInfoUnitBox>
          <TattooistInfoText type="description">
            {tattooist.description}
          </TattooistInfoText>
          {/* <TattooistInfoTitle>주장르</TattooistInfoTitle> */}
          {/* <TattooistInfoText>{tattooist.specialize}</TattooistInfoText> */}
        </TattooistInfoUnitBox>

      </TattooistInfoBox>
    </>
  );
};

export default React.memo(Tattooist);
