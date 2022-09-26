import { Outlet } from "react-router-dom";
import SideNav from "../components/organisms/common/SideNav";
import {
  ContentsDiv,
  ProfileEditBox,
  ProfileEditorBox,
} from "../styledComponents";

/* 프로필 편집 페이지*/
const ShowProfileEdit = () => {
  return (
    <>
      <ContentsDiv>
        <ProfileEditBox>
          {/* 사이드 네비게이션 */}
          <SideNav />
          <ProfileEditorBox>
            {/* 프로필 편집 */}
            <Outlet />
          </ProfileEditorBox>
        </ProfileEditBox>
      </ContentsDiv>
    </>
  );
};

export default ShowProfileEdit;
