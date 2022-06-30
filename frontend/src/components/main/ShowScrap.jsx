import React, { useEffect, useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { 
  ContentsDiv, SmallNavigation, SmallNavigationBtn,
} from '../../styledComponents';

import SmallNavigationComp from './SmallNavigationComp';

const ShowScrap = () => {
  const [isDraft, setIsDraft] = useState(false);
  const [isTattooist, setIsTattooist] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    const path = location.pathname;

    if(path === '/scrap' || path === '/scrap/draft'){
      setIsDraft(true);
      navigate('/scrap/draft')
    } else if(path === '/scrap/tattooist'){
      setIsTattooist(true);
    }
  }, []);

  const onBtnClick = (e) => {
    if(e.target.id === 'draft'){
      setIsDraft(true);
      setIsTattooist(false);
      navigate('/scrap/draft')
    } else {
      setIsDraft(false);
      setIsTattooist(true);
      navigate('/scrap/tattooist')
    }
  }


  return (
  <>
      {/* <SmallNavigationComp texts={["Draft", "Tattooist"]}
        searchBox={false} location={2} /> */}
      <SmallNavigation style={{left: 'calc((1300 / 4) * 2.33px)'}}>

        <SmallNavigationBtn
          id={"draft"}
          onClick={onBtnClick}
          style={isDraft ? {color: 'black'} : {}}
        >
          Draft
        </SmallNavigationBtn>
        <SmallNavigationBtn
          id={"tattooist"}
          onClick={onBtnClick}
          style={isTattooist ? {color: 'black'} : {}}
        >
          Tattooist
        </SmallNavigationBtn>

      </SmallNavigation>

      <ContentsDiv>
        <Outlet />
      </ContentsDiv>
    </>
  )
};

export default ShowScrap;