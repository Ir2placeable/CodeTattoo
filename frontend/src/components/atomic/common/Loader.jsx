import React from "react";
import ReactLoading from "react-loading";
import { LoadingBox } from "../../../styledComponents";

function Loader({ type, color}) {
  return (
    <LoadingBox>
        <ReactLoading type={type} color={color} height={"80%"} width={"80%"} />
    </LoadingBox>
  );
}

export default Loader;
