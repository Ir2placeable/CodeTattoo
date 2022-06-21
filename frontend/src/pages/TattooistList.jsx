import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { 
  DraftListBigDiv,
  DraftMainDiv,
  CategoryTitle,
  TattooistListDiv,
  ListTextDiv,
  TattooistBox,
  RankingDiv,
  ListImgDiv,
  ListDescDiv,
  ListHeartDiv
} from '../styledComponents';

import HeartIcon from './HeartIcon';
import axios from 'axios';

const TattooistList = ({ apiUrl, cookies }) => {
  const [tattooists, setTattooists] = useState([]);
  
  const sendRequest = async() => {
    const res = await axios.get(`${apiUrl}/tattooist`)
    console.log(res);
  }

  useEffect(() => {
    sendRequest();
  }, [])

  return (
    <>
      <DraftListBigDiv>
        <DraftMainDiv>

          <CategoryTitle>
            Tattoists
          </CategoryTitle>

          <TattooistListDiv>
            <ListTextDiv>
              <span>Tattoists List</span>
            </ListTextDiv>

            <TattooistBox>
              <RankingDiv>
                <span>1</span>
              </RankingDiv>
              <ListImgDiv>
                <FontAwesomeIcon icon={faUser} />
              </ListImgDiv>
              <ListDescDiv>
                nickname / specialize / description
              </ListDescDiv>
              <ListHeartDiv>
                <HeartIcon size={28} />
              </ListHeartDiv>
            </TattooistBox>
          </TattooistListDiv>
        </DraftMainDiv>
      </DraftListBigDiv>
    </>
  );
};

export default TattooistList;