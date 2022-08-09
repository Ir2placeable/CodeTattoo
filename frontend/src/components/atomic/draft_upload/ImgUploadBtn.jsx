import React, { memo } from "react";
import { EnrollImgBtn } from "../../../styledComponents";

const ImgUploadBtn = memo(({ onSubmit }) => {
  return <EnrollImgBtn onClick={onSubmit}>도안 업로드</EnrollImgBtn>;
});

export default ImgUploadBtn;
