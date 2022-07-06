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
import FollowBtn from "../common/FollowBtn";
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

  const sendRequest = async () => {
    let query = "";
    if (cookies.tattooist_id) {
      query = `?tattooist_id=${cookies.tattooist_id}`;
    } else if (cookies.user_id) {
      query = `?user_id=${cookies.user_id}`;
    }

    const res = await axios.get(
      `${APIURL}/main/tattooist/${filter}/${page}/${query}`
    );

    if (res.data.success) {
      setTattooists(res.data.tattooist_list);
      console.log(res.data.tattooist_list);
    } else {
      console.log("Tattooist List Get Request Fail");
    }
  };

  useEffect(() => {
    sendRequest();
  }, [page]);

  return (
    <>
      <ListDiv>
        {tattooists.length === 0 ? (
          <EmptyBox>아직 등록한 타투이스트가 없습니다.</EmptyBox>
        ) : (
          <TattooistMainBox>
            {tattooists.map((tattooist) => (
              <TattooistContainer key={tattooist.tattooist_id}>
                {tattooist.image ? (
                  <TattooistImg
                    src={tattooist.image}
                    alt={tattooist.nickname}
                    id={tattooist.tattooist_id}
                  />
                ) : (
                  <TattooistImg />
                )}
                <TattooistInfoBox>
                  <TattooistInfo>Nickname : {tattooist.nickname}</TattooistInfo>
                  <TattooistInfo>Office : {tattooist.office}</TattooistInfo>
                  <TattooistInfo>
                    Specialize : {tattooist.spcialize}
                  </TattooistInfo>
                  <TattooistInfo>follwers : {tattooist.follow}</TattooistInfo>
                </TattooistInfoBox>
                {cookies.user_id ? (
                  <TattooistControlBox>
                    <FollowBtn
                      cookies={cookies}
                      tattooist_id={tattooist.tattooist_id}
                      isFollowed={tattooist.isFollowed}
                    ></FollowBtn>
                    <TattooistBtn>Reserve</TattooistBtn>
                  </TattooistControlBox>
                ) : (
                  <div></div>
                )}
              </TattooistContainer>
            ))}
          </TattooistMainBox>
        )}
      </ListDiv>
    </>
  );
};

export default TattooistList;
