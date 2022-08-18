import React from "react";
import { ProfileUploadButton } from "../../../styledComponents";

const ProfileUploadBtn = ({ onSubmit, type }) => {
  return (
    <>
      <ProfileUploadButton onClick={onSubmit} type={type}>
        등록
      </ProfileUploadButton>
    </>
  );
};

export default React.memo(ProfileUploadBtn);
