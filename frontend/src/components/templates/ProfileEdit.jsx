import React from "react";
import { ProfileEditorBox } from "../../styledComponents";
import EditImg from "../organisms/edit/EditImg";
import EditUserProfile from "../organisms/edit/EditUserProfile";

const ProfileEdit = () => {
  return (
    <>
      <ProfileEditorBox>
        <EditImg />
        <EditUserProfile />
      </ProfileEditorBox>
    </>
  );
};

export default ProfileEdit;
