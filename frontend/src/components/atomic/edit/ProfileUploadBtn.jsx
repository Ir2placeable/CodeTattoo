import React from "react";
import { ProfileUploadButton } from "../../../styledComponents";

const ProfileUploadBtn = ({ onSubmit }) => {
  return (
    <>
      <ProfileUploadButton onClick={onSubmit}>등록</ProfileUploadButton>
    </>
  );
};

export default React.memo(ProfileUploadBtn);
