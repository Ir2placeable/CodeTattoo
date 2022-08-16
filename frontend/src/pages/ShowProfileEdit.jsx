import { Outlet } from "react-router-dom";
import SideNav from "../components/organisms/common/SideNav";
import {
  ContentsDiv,
  ProfileEditBox,
  ProfileEditorBox,
} from "../styledComponents";

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
