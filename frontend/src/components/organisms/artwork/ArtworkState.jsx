import { MyTattooContainer, MyTattooImg, MyTattooStateBox } from "../../../styledComponents";
import ArtworkSwiper from "./ArtworkSwiper";

/**
 * 상위 컴포넌트 === ShowArtworkDetail.jsx
 * 작업물 상세 페이지/ 작업물 State
 * @param {Array} tattoo 작업물 State
 * @param {String} image  작업물 대표 이미지
 */

const ArtworkState = ({ tattoo, image }) => {
  return (
    <>
      <MyTattooContainer>
        {image ? <MyTattooImg src={image} /> : <MyTattooImg />}
        <MyTattooStateBox>
          <ArtworkSwiper states={tattoo} />
        </MyTattooStateBox>
      </MyTattooContainer>
    </>
  );
};

export default ArtworkState;
