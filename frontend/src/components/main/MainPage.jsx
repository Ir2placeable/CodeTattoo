import React, { useEffect, useState } from 'react';
import { 
  MainNavigation, MainNavigationInner,
  MainNavigationBtn, MainNavigationBtnStyle, 
  MainContentsDiv, 
} from '../../styledComponents';

import { Outlet, useNavigate, useLocation } from 'react-router-dom';

const MainPage = ({ cookies }) => {
  // Navigation 버튼 상태 변수
  const [isClicked, setIsClicked] = useState({
    draft: false,
    tattooist: false,
    scrap: false,
    myTattoo: false,
    manageWork: false,
    manageDraft: false
  })

  const location = useLocation();
  useEffect(() => {
    const [ , name] = location.pathname.split('/')

    setIsClicked({
      [name]: true
    })
  }, []);

  const navigate = useNavigate();
  const onBtnClick = (e) => {
    const _id = e.target.id;
    const temp = {
      draft: false,
      tattooist: false,
      scrap: false,
      myTattoo: false,
      manageWork: false,
      manageDraft: false
    }
    temp[_id] = true;
    setIsClicked(temp)

    navigate(`/${_id}`)
  }

  return (
    <>
    {/* --- Main Navigation --- */}
      <MainNavigation>

        <MainNavigationInner>

          <MainNavigationBtn
            onClick={onBtnClick}
            id="draft"
            style={isClicked.draft ? MainNavigationBtnStyle : {}}
          >
            도안
          </MainNavigationBtn>


          <MainNavigationBtn
            onClick={onBtnClick}
            id="tattooist"
            style={isClicked.tattooist ? MainNavigationBtnStyle : {}}
          >
            타투이스트
          </MainNavigationBtn>

          {cookies.tattooist_id ? (
            <>
              <MainNavigationBtn
                onClick={onBtnClick}
                id="manageWork"
                style={isClicked.manageWork ? MainNavigationBtnStyle : {}}
              >
                작업물 관리
              </MainNavigationBtn>
              <MainNavigationBtn
                onClick={onBtnClick}
                id="manageDraft"
                style={isClicked.manageDraft ? MainNavigationBtnStyle : {}}
              >
                도안 관리
              </MainNavigationBtn>
            </>
          ) : (
            <>
              <MainNavigationBtn
                onClick={onBtnClick}
                id="scrap"
                style={isClicked.scrap ? MainNavigationBtnStyle : {}}
              >
                스크랩
              </MainNavigationBtn>
              <MainNavigationBtn
                onClick={onBtnClick}
                id="myTattoo"
                style={isClicked.myTattoo ? MainNavigationBtnStyle : {}}
              >
                마이 타투
              </MainNavigationBtn>
            </>
          )}

        </MainNavigationInner>

      </MainNavigation>
      {/* --- end Main Navigation --- */}

      <MainContentsDiv>
        <Outlet />
      </MainContentsDiv>
    </>
  );
};

export default MainPage;