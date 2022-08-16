import React from "react";
import { EditImgBox, ProfileFormBox } from "../../styledComponents";
import EditUserProfile from "../organisms/edit/EditUserProfile";
import EditTattooistProfile from "../organisms/edit/EditTattooistProfile";
import { getCookie } from "../../config/cookie";

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
