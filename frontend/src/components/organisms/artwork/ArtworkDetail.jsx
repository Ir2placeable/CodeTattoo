import {
  ArtworkBox,
  ArtworkImg,
  ArtworkInfoBlock,
  ArtworkInfoBox,
  ArtworkInfoUnit,
  TattooistGenreLabel,
} from "../../../styledComponents";

/**
 * 상위 컴포넌트 === ShowArtworkDetail.jsx
 * 작업물 상세 페이지/ 작업물 상세 
 * @param {Object} artwork 작업물 정보
 * @param {String} image  작업물 이미지
 */

const ArtworkDetail = ({ artwork, image }) => {
  return (
    <>
      <ArtworkBox>
        <ArtworkImg src={image} />
        <ArtworkInfoBox>
          <ArtworkInfoBlock>
            <TattooistGenreLabel>소요 시간</TattooistGenreLabel>
            <ArtworkInfoUnit>{artwork.taken_time}</ArtworkInfoUnit>
            <TattooistGenreLabel>작업 가격</TattooistGenreLabel>
            <ArtworkInfoUnit>{artwork.cost}</ArtworkInfoUnit>
          </ArtworkInfoBlock>
          <ArtworkInfoBlock>
            <TattooistGenreLabel>작업자</TattooistGenreLabel>
            <ArtworkInfoUnit>{artwork.tattooist_nickname}</ArtworkInfoUnit>
          </ArtworkInfoBlock>
          <ArtworkInfoBlock>
            <TattooistGenreLabel>부위</TattooistGenreLabel>
            <ArtworkInfoUnit>{artwork.body_part}</ArtworkInfoUnit>
            <TattooistGenreLabel>깊이</TattooistGenreLabel>
            <ArtworkInfoUnit>{artwork.depth}</ArtworkInfoUnit>
          </ArtworkInfoBlock>
          <ArtworkInfoBlock>
            <TattooistGenreLabel>잉크</TattooistGenreLabel>
            <ArtworkInfoUnit>{artwork.inks}</ArtworkInfoUnit>
            <TattooistGenreLabel>머신</TattooistGenreLabel>
            <ArtworkInfoUnit>{artwork.machine}</ArtworkInfoUnit>
          </ArtworkInfoBlock>
        </ArtworkInfoBox>
      </ArtworkBox>
    </>
  );
};

export default ArtworkDetail;
