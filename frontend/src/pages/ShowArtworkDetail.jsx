import { ContentsDiv } from "../styledComponents";
import useArtworkDetail from "../hooks/useArtworkDetail";
import { Outlet, useParams } from "react-router-dom";

const ShowArtworkDetail = () => {
  const param = useParams();
  const tattooist_id = param.tattooist_id;
  const detail = useArtworkDetail(tattooist_id);

  return (
    <>
      <ContentsDiv>
        <Outlet context={{ detail }} />
      </ContentsDiv>
    </>
  );
};

export default ShowArtworkDetail;
