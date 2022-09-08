import { ContentsDiv, ListDiv } from "../styledComponents";
import useArtworkDetail from "../hooks/useArtworkDetail";
import { Outlet, useParams } from "react-router-dom";
import ShowMyTattoo from "./ShowMyTattoo";

const ShowArtworkDetail = () => {
  const [info, states] = useArtworkDetail();
  console.log(info, states);
  return (
    <>
      <ContentsDiv>
        <ListDiv>

        </ListDiv>
      </ContentsDiv>
    </>
  );
};

export default ShowArtworkDetail;
