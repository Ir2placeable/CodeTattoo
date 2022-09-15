import React from "react";
import { ProfileUploadButton } from "../../../styledComponents";

/** 상위 컴포넌트 === EditUserProfile.jsx && EditTattooistProfile.jsx
 * && PasswordEdit.jsx && ImageEdit.jsx && DeleteAccount.jsx
 * 프로필 편집 페이지 / 프로필 갱신 버튼
 * @param {Function} onSubmit 등록
 * @param {String} type 버튼 타입
 * @param {String} text 버튼 텍스트 
 */

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
