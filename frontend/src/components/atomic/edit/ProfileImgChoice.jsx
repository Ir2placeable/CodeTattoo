import React from "react";
import {
  ProfileImgInput,
  ProfileImgInputLabel,
  ProfileImgInputBox,
} from "../../../styledComponents";

/** 상위 컴포넌트 === ImageEdit.jsx
 * 프로필 편집 페이지/ 이미지 파일 선택 버튼
 * @param {Function} onSelectFile 이미지 파일 선택  
 */

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
