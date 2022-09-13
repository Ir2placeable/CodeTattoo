import React from "react";
import { ProfileFormBox } from "../../styledComponents";
import EditUserProfile from "../organisms/edit/EditUserProfile";
import EditTattooistProfile from "../organisms/edit/EditTattooistProfile";
import { getCookie } from "../../config/cookie";

/** 
 * 상위 컴포넌트 === ShowProfileEdit.jsx
 * 프로필 정보 편집 템플릿 
 */

const ProfileEdit = () => {
  return (
    <>
      <ProfileFormBox>
        {getCookie("user_id") ? <EditUserProfile /> : <EditTattooistProfile />}
      </ProfileFormBox>
    </>
  );
};

export default ProfileEdit;
