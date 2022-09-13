import { useEffect } from "react";
import {
  ArtworkBox,
  ArtworkImg,
  ArtworkInfoBlock,
  ArtworkInfoBox,
  ArtworkInfoUnit,
  ArtworkTattooistNickname,
  TattooistGenreLabel,
} from "../../../styledComponents";

const ArtworkDetail = ({ artwork, image}) => {
  console.log(artwork)
  return (
    <>
      <ArtworkBox>
        <ArtworkImg src={image} />
        <ArtworkInfoBox>
          <ArtworkInfoBlock>
            <TattooistGenreLabel>소요 시간</TattooistGenreLabel>
            <ArtworkInfoUnit>30분</ArtworkInfoUnit>
            <TattooistGenreLabel>작업 가격</TattooistGenreLabel>
            <ArtworkInfoUnit>30000원</ArtworkInfoUnit>
          </ArtworkInfoBlock>
          <ArtworkInfoBlock>
            <TattooistGenreLabel>작업자</TattooistGenreLabel>
            <ArtworkInfoUnit>{artwork.tattooist_nickname}</ArtworkInfoUnit>
          </ArtworkInfoBlock>
          <ArtworkInfoBlock>
            <TattooistGenreLabel>부위</TattooistGenreLabel>
            <ArtworkInfoUnit>다리</ArtworkInfoUnit>
          </ArtworkInfoBlock>
          <ArtworkInfoBlock>
            <TattooistGenreLabel>사용 잉크</TattooistGenreLabel>
            <ArtworkInfoUnit>사용잉크</ArtworkInfoUnit>
          </ArtworkInfoBlock>
          <ArtworkInfoBlock>
            <TattooistGenreLabel>머신</TattooistGenreLabel>
            <ArtworkInfoUnit>머신</ArtworkInfoUnit>
          </ArtworkInfoBlock>
          
        </ArtworkInfoBox>
      </ArtworkBox>
    </>
  );
};

export default ArtworkDetail;
