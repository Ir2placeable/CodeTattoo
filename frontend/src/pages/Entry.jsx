import React, { useState, useEffect } from 'react';
import { 
  MainDiv,
  BtnBox,
  ContentBtn,
} from '../styledComponents';
import { useNavigate } from 'react-router-dom';

const contentBtnStyle = {
  width: '400px',
  height: '400px'
}

const Entry = ({ cookies }) => {
  const [isTattooist, setIsTattooist] = useState(false);

  useEffect(()=>{
    if(cookies.user_id && cookies.isTattooist){
      setIsTattooist(true);
    } else {
      setIsTattooist(false);
    }
  }, [])

  const navigate = useNavigate();

  const goUploadImage = () => {
    navigate('/imgload');
  }

  const goDrafts = () => {
    navigate('/tattoo/all');
  }
  const goTattooists = () => {

  }
  
  return (
    <>
      <MainDiv>

        {isTattooist ? (
          <BtnBox>
            <ContentBtn onClick={goDrafts}>Show Drafts</ContentBtn>
            <ContentBtn onClick={goTattooists}>Show Tattooists</ContentBtn>
            <ContentBtn onClick={goUploadImage}>Upload Draft</ContentBtn>
          </BtnBox>

        ) : (
          <BtnBox>
            <ContentBtn style={contentBtnStyle} onClick={goDrafts}>Show Drafts</ContentBtn>
            <ContentBtn style={contentBtnStyle} onClick={goTattooists}>Show Tattooists</ContentBtn>
          </BtnBox>
        )}

      </MainDiv>
    </>
  );
};

export default React.memo(Entry);