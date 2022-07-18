import React, { useEffect, useState } from 'react';
import { 
  MainNavigation, MainNavigationInner,
  MainContentsDiv, 
} from '../../styledComponents';

import { Outlet, useLocation } from 'react-router-dom';
import { getCookie } from '../../config/cookie';
import NavigationBtn from '../atomic/NavigationBtn';

const MainPage = () => {
  // Navigation 버튼 상태 변수
  const [pathname, setPathname] = useState('');

  const location = useLocation();
  useEffect(() => {
    const [ , name] = location.pathname.split('/')
    setPathname(name);
  }, [location.pathname]);

  return (
    <>
    {/* --- Main Navigation --- */}
      <MainNavigation>

        <MainNavigationInner>

          <NavigationBtn 
            text="도안" path="draft" pathname={pathname} />

          <NavigationBtn 
            text="타투이스트" path="tattooist" pathname={pathname} />

          {getCookie('tattooist_id') ? (
            <>
              <NavigationBtn 
                text="작업물관리" path="manageWork" 
                pathname={pathname} />
              <NavigationBtn 
                text="도안관리" path="manageDraft" 
                pathname={pathname} />
            </>
          ) : getCookie('user_id') && (
            <>
              <NavigationBtn 
                text="스크랩" path="scrap" 
                pathname={pathname} />
              <NavigationBtn 
                text="마이타투" path="myTattoo" 
                pathname={pathname} />
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