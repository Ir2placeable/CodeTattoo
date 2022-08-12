import { Outlet } from "react-router-dom";
import SideNav from "../components/organisms/common/SideNav";
import { ContentsDiv, ProfileEditBox } from "../styledComponents";

const ShowProfileEdit = () => {
  return (
    <>
      <ContentsDiv>
        <ProfileEditBox>
          <SideNav/>
          <Outlet/>
        </ProfileEditBox>
      </ContentsDiv>
    </>
  );
};

export default ShowProfileEdit;
