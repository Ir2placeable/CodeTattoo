import React from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import MyPageProfile from "../components/organisms/mypage/MyPageProfile";
import { 
  ContentsDiv, ListDiv, MyPageDiv, 
  MyPageAddBtnDiv, MyPageAddBtn
} from "../styledComponents";
import MyPageNav from "../components/organisms/common/MyPageNav";
import useTattooistDetail from "../hooks/useTattooistDetail";

const ShowTattooistDetail = () => {
  const location = useLocation();
  const path = location.pathname; // tattooist/tattooist_id/filter
  const [profile, items] = useTattooistDetail(path);
  console.log(profile, items);

  const onMouseEnter = (e) => {
    e.target.innerText = `${e.target.id} 추가`
  }
  const onMouseLeave = (e) => {
    e.target.innerText = '+';
  }

  const navigate = useNavigate();

  return (
    <>
      <MyPageDiv>
        <ListDiv>
          <MyPageProfile profile={profile} />
          <MyPageNav />
          <Outlet context={items} />
        </ListDiv>

        <MyPageAddBtnDiv>
          <MyPageAddBtn 
            type="draft"
            id="도안"
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            onClick={() => navigate('/upload')}
          >
            +
          </MyPageAddBtn>
          <MyPageAddBtn 
            type="artwork"
            id="작업물"
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
          >
            +
          </MyPageAddBtn>
        </MyPageAddBtnDiv>
      </MyPageDiv>
    </>
  );
};

export default ShowTattooistDetail;
