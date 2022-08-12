import React, { useState } from "react";
import {
  ProfileInfoInput,
  ProfileInfoInputBox,
  ProfileInfoInputLabel,
} from "../../../styledComponents";

const EditUserProfile = () => {
  const [nickname, setNickname] = useState();
  const [location, setLocation] = useState();

  const onChange = (e) => {
    if (e.target.id === "input-nickname") setNickname(e.target.value);
    else if (e.target.id === "input-location") setLocation(e.target.value);
  };

  return (
    <>
      <ProfileInfoInputBox>
        <ProfileInfoInputLabel htmlFor="input-nickname">
          Nickname
        </ProfileInfoInputLabel>
        <ProfileInfoInput
          type="text"
          id="input-nickname"
          onChange={onChange}
          value={nickname}
        />
      </ProfileInfoInputBox>
      <ProfileInfoInputBox>
        <ProfileInfoInputLabel htmlFor="input-location">
          Location
        </ProfileInfoInputLabel>
        <ProfileInfoInput
          type="text"
          id="input-location"
          onChange={onChange}
          value={location}
        />
      </ProfileInfoInputBox>
    </>
  );
};

export default EditUserProfile;
