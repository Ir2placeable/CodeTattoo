import React from "react";
import {
  DraftImgBox,
  DraftImgInfo,
  DraftHeartBox,
  DraftDrawerDiv,
  DraftDrawerImg,
  DraftDrawer,
  DraftImgDiv,
  DraftImgHoverDiv,
  DraftDrawerImgDiv,
  DraftGenreDiv,
} from "../../../styledComponents";

import DraftTitle from "../../atomic/draft/DraftTitle";
import DraftImage from "../../atomic/draft/DraftImage";
import HeartIcon from "../../atomic/draft/HeartIcon";
import UserIcon from "../../atomic/common/UserIcon";
import { useState } from "react";
import { goDraftDetail, goTattooistDetail } from "../../../config/navigate";

/** 상위 컴포넌트 === DraftList.jsx
 * 도안 목록 페이지 / 도안
 * @param {String} draft_id 도안 아이디
 * @param {String} image 도안 이미지
 * @param {String} title 도안 제목
 * @param {String} like 도안 추천수
 * @param {String} drawer_id 도안 제작자 아이디
 * @param {String} drawer_image 도안 제작자 이미지
 * @param {String} drawer_nickname 도안 제작자 닉네임
 * @param {Boolean} isScraped 스크랩 여부
 */
const Draft = ({
  draft_id,
  image,
  title,
  like,
  drawer_id,
  drawer_image,
  drawer_nickname,
  isScraped,
  genre
}) => {
  // Hover Style
  const [hover, setHover] = useState(false);

  const onHover = (e) => {
    setHover(hover ? false : true);
  };

  const goDetail = () => {
    goDraftDetail(draft_id);
  };

  const goTattooist = () => {
    goTattooistDetail(drawer_id);
  };

  return (
    <>
      <DraftImgBox>
        <DraftDrawerDiv onClick={goTattooist}>
          <DraftDrawerImgDiv>
            {drawer_image ? (
              <DraftDrawerImg src={drawer_image} />
            ) : (
              <UserIcon />
            )}
          </DraftDrawerImgDiv>

          <DraftDrawer>{drawer_nickname}</DraftDrawer>
        </DraftDrawerDiv>

        <DraftGenreDiv>
          {genre}
        </DraftGenreDiv>

        <DraftImgDiv onClick={goDetail}>
          <DraftImage src={image} alt={title} id={draft_id} onHover={onHover} />

          {hover && (
            <DraftImgHoverDiv onMouseLeave={onHover}>
              {like} likes
            </DraftImgHoverDiv>
          )}
        </DraftImgDiv>

        <DraftImgInfo>
          <DraftTitle title={title} />

          <DraftHeartBox>
            <HeartIcon isScraped={isScraped} draft_id={draft_id} />
          </DraftHeartBox>
        </DraftImgInfo>
      </DraftImgBox>
    </>
  );
};

export default React.memo(Draft);
