import React from "react";
import {
  ProfileImgInput,
  ProfileImgInputLabel,
  ProfileImgInputBox,
} from "../../../styledComponents";

const ProfileImgChoice = ({ onSelectFile }) => {
  return (
    <>
      <ProfileImgInputBox>
        <ProfileImgInputLabel htmlFor="input-profile-img">
          이미지 업로드
        </ProfileImgInputLabel>
        <ProfileImgInput
          type="file"
          id="input-profile-img"
          onChange={onSelectFile}
        />
      </ProfileImgInputBox>
    </>
  );
};

export default React.memo(ProfileImgChoice);
