import { MyTattooContainer, MyTattooImg, MyTattooStateBox } from "../../../styledComponents";
import ArtworkSwiper from "./ArtworkSwiper";

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
