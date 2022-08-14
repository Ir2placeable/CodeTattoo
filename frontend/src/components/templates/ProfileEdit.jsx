import React from "react";
import { ProfileEditorBox } from "../../styledComponents";
import EditImg from "../organisms/edit/EditImg";
import EditUserProfile from "../organisms/edit/EditUserProfile";
import EditTattooistProfile from "../organisms/edit/EditTattooistProfile";

const ProfileEdit = () => {
  return (
    <>
      <ProfileEditorBox>
        <EditImg />
        <EditTattooistProfile />
      </ProfileEditorBox>
    </>
  );
};

export default ProfileEdit;
