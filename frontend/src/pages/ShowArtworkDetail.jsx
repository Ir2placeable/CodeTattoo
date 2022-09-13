import { useEffect, useState } from "react";
import {
  ContentsDiv,
  ArtworkDetailMainBox,
  ListDiv,
  HorizontalLine,
} from "../styledComponents";
import useArtworkDetail from "../hooks/useArtworkDetail";
import ArtworkDetail from "../components/organisms/artwork/ArtworkDetail";
import ArtworkState from "../components/organisms/artwork/ArtworkState";


/* 작업물 상세 페이지 */
const ShowArtworkDetail = () => {
  const sendRequest = useArtworkDetail();
  const [info, setInfo] = useState({});
  const [tattoo, setTattoo] = useState([]);
  const [image, setImage] = useState("");
  
  useEffect(() => {
    sendRequest().then((ret) => {
      setInfo(ret[0]);
      setTattoo(ret[1]);
      setImage(ret[2]);
    });
  }, []);

  return (
    <>
      <ContentsDiv>
        <ListDiv>
          <ArtworkDetailMainBox>
            {/* 작업물 상세 정보 */}
          <ArtworkDetail artwork={info} image={image} />
            <HorizontalLine />
            {/* 작업물 상세 State */}
            <ArtworkState tattoo={tattoo} image={image}/>
          </ArtworkDetailMainBox>
        </ListDiv>
      </ContentsDiv>
    </>
  );
};

export default ShowArtworkDetail;
