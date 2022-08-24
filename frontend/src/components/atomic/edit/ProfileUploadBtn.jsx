import React from "react";
import { ProfileUploadButton } from "../../../styledComponents";

const ProfileUploadBtn = ({ onSubmit, type, text }) => {
  return (
    <>
      <ProfileUploadButton onClick={onSubmit} type={type}>
        {text}
      </ProfileUploadButton>
    </>
  );
};

export default React.memo(ProfileUploadBtn);
