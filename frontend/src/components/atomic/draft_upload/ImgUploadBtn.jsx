import React, { memo } from "react";
import { EnrollImgBtn } from "../../../styledComponents";

/** 상위 컴포넌트 === DraftUpload.jsx
 * 도안 업로드 페이지 / 도안 업로드 버튼
 * @param {Function} onSubmit 도안 업로드 api 호출 함수
 */
const ImgUploadBtn = memo(({ onSubmit, text }) => {
  return <EnrollImgBtn onClick={onSubmit}>{text}</EnrollImgBtn>;
});

export default ImgUploadBtn;
