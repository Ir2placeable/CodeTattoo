import React from "react";
import ReactLoading from "react-loading";
import { LoadingBox } from "../../../styledComponents";

/**
 * 로더
 * @param {String} type 로더 타입
 * @param {String} color 로더 색상
 */

function Loader({ type, color}) {
  return (
    <LoadingBox>
        <ReactLoading type={type} color={color} height={"80%"} width={"80%"} />
    </LoadingBox>
  );
}

export default Loader;
