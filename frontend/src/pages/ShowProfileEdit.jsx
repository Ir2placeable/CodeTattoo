import { Outlet } from "react-router-dom";
import SideNav from "../components/organisms/common/SideNav";
import {
  ContentsDiv,
  ProfileEditBox,
  ProfileEditorBox,
} from "../styledComponents";

/**
 * @file Profile Editpr Page
 * @Outlet Image, Profile, Password, Delete Account
 */

const ShowProfileEdit = () => {
  return (
    <>
      <ContentsDiv>
        <ProfileEditBox>
          <SideNav />
          <ProfileEditorBox>
            <Outlet />
          </ProfileEditorBox>
        </ProfileEditBox>
      </ContentsDiv>
    </>
  );
};

export default ShowProfileEdit;
