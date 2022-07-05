import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import {
  EmptyBox,
  ListDiv,
  TattooistMainBox,
  TattooistContainer,
  TattooistImg,
  TattooistInfoBox,
  TattooistInfo,
  TattooistControlBox,
  TattooistBtn,
  userIconStyle,
} from "../../styledComponents";
import { APIURL } from "../../config/key";
import axios from "axios";

// tattooist_list = { 
//   tattooist_id, image, nickname, 
//   office, contact, description, 
//   specialize, followers, isFollowed }
const TattooistList = ({ cookies, filter, path }) => {
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState([]);
  const [tattooists, setTattooists] = useState([]);
  const [noTattooist, setNoTattooist] = useState(false);

  const sendRequest = async () => {
    const res = await axios.get(
      `${APIURL}/main/tattooist/${filter}/${page}/?user_id=${cookies.user_id}`
    );
    console.log(res);

    if (res.data.success) {
      setTattooists(res.data.tattooist_list);
      console.log(tattooists);
    } else {
      console.log("Tattooist List Get Request Fail");
    }
  };

  useEffect(() => {
    sendRequest();
  }, []);

  return (
    <>
      <ListDiv>
        <TattooistMainBox>
          {/* 데이터 주입
           {tattooists.map((tattooist) => (
            <TattooistContainer key={tattooist.tattooist_id}>
              {tattooist.image ? (
                <TattooistImg
                  src={tattooist.image}
                  alt={tattooist.nickname}
                  id={tattooist.id}
                />
              ) : (
                <FontAwesomeIcon style={userIconStyle} icon={faUser} />
              )}
              <TattooistInfoBox>
                <TattooistInfo>Nickname : {tattooist.nickname}</TattooistInfo>
                <TattooistInfo>Office : {tattooist.office}</TattooistInfo>
                <TattooistInfo>Specialize : {tattooist.spcialize}</TattooistInfo>
                <TattooistInfo>follwers {tattooist.follow}</TattooistInfo>
              </TattooistInfoBox>
              <TattooistControlBox>
              { tattooist.ifFollowed ? (
                    <TattooistBtn>Unfollow</TattooistInfo>
                ) : (
                    <TattooistBtn>Follow</TattooistInfo>
                ) }
                <TattooistBtn>Reserve</TattooistBtn>
              </TattooistControlBox>
            </TattooistContainer>
            ))}     
        */}
          <TattooistContainer>
            <TattooistImg>Image</TattooistImg>
            <TattooistInfoBox>
              <TattooistInfo>Nickname : SpongeBob</TattooistInfo>
              <TattooistInfo>Office : Bikini Bottom</TattooistInfo>
              <TattooistInfo>Specialize : making hamberger</TattooistInfo>
              <TattooistInfo>follwers 1.1K</TattooistInfo>
            </TattooistInfoBox>
            <TattooistControlBox>
              <TattooistBtn>Follow</TattooistBtn>
              <TattooistBtn>Reserve</TattooistBtn>
            </TattooistControlBox>
          </TattooistContainer>

          <TattooistContainer>
            <TattooistImg>Image</TattooistImg>
            <TattooistInfoBox>
              <TattooistInfo>Nickname : SpongeBob</TattooistInfo>
              <TattooistInfo>Office : Bikini Bottom</TattooistInfo>
              <TattooistInfo>Specialize : making hamberger</TattooistInfo>
              <TattooistInfo>follwers 1.1K</TattooistInfo>
            </TattooistInfoBox>
            <TattooistControlBox>
              <TattooistBtn>Follow</TattooistBtn>
              <TattooistBtn>Reserve</TattooistBtn>
            </TattooistControlBox>
          </TattooistContainer>
        </TattooistMainBox>
      </ListDiv>
    </>
  );
};

export default TattooistList;
