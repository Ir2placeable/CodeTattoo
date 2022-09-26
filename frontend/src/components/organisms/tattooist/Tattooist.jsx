import React, { useCallback, useState } from "react";
import { useSearchParams } from "react-router-dom";
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
import { goTattooistDetail } from "../../../config/navigate";

/** 상위 컴포넌트 === TattooistList.jsx
 * 타투이스트 목록 페이지/ 타투이스트
 * @param {Object} tattooist 타투이스트 데이터 
 */

const Tattooist = ({ tattooist }) => {
  const tattooist_id = tattooist.tattooist_id;

  // 타투이스트 세부 페이지 이동
  const goDetail = useCallback(() => {
    goTattooistDetail(tattooist_id)
  }, [tattooist_id]);

  // Hover Style
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
        </TattooistInfoUnitBox>

        <TattooistInfoUnitBox>
          <TattooistInfoText type="description">
            {tattooist.description}
          </TattooistInfoText>
        </TattooistInfoUnitBox>

      </TattooistInfoBox>
    </>
  );
};

export default React.memo(Tattooist);
