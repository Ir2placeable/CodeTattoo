import { ProfileFormBox } from "../../styledComponents";
import ProfileUploadBtn from "../atomic/edit/ProfileUploadBtn";

const PasswordEdit = () => {
  const onSubmit = () => {};

  return (
    <>
      <ProfileFormBox>
        <ProfileUploadBtn onSubmit={onSubmit} type="profile" text="변경" />
      </ProfileFormBox>
    </>
  );
};

export default PasswordEdit;
