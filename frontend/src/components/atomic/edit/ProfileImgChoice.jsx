import React from "react";
import {
  ProfileImgInput,
  ProfileImgInputLabel,
} from "../../../styledComponents";

const ProfileImgChoice = ({ onSelectFile }) => {
  return (
    <>
      <ProfileImgInputLabel htmlFor="input-profile-img">
        이미지 업로드
      </ProfileImgInputLabel>
      <ProfileImgInput
        type="file"
        id="input-profile-img"
        onChange={onSelectFile}
      />
    </>
  );
};

export default React.memo(ProfileImgChoice);
