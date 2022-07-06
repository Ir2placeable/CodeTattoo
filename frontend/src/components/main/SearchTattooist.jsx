import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
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
} from "../../styledComponents";
import { APIURL } from "../../config/key";
import axios from "axios";

const SearchTattooist = ({ cookies }) => {
  const params = useParams();
  const nickname = params.nickname;

  const [page, setPage] = useState(1);
  const [pages, setPages] = useState([]);
  const [tattooists, setTattoists] = useState([]);
  const [noTattooist, setNoTattooist] = useState(false);

  const sendRequest = async () => {
    let query = "";
    if (cookies.tattooist_id) {
      query = `?tattooist_id=${cookies.tattooist_id}`;
    } else if (cookies.user_id) {
      query = `?user_id=${cookies.user_id}`;
    }

    const res = await axios.get(
      `${APIURL}/main/tattooist/search/${page}/${query}&nickname=${nickname}`
    );

    if (res.data.success) {
      setTattoists(res.data.tattooist_list);
      console.log(res.data.tattooist_list);
    } else {
      // 검색 결과 없음
      setNoTattooist(true);
    }
  };

  useEffect(() => {
    sendRequest();
  }, [page]);

  return (
    <>
      <ListDiv>
        {noTattooist ? (
          <EmptyBox>검색 결과가 없습니다.</EmptyBox>
        ) : (
          <TattooistMainBox>
            {tattooists.map((tattooist) => (
              <TattooistContainer key={tattooist.tattooist_id}>
                {tattooist.image ? (
                  <TattooistImg
                    src={tattooist.image}
                    alt={tattooist.nickname}
                    id={tattooist.id}
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
                <TattooistControlBox>
                  {tattooist.ifFollowed ? (
                    <TattooistBtn>Unfollow</TattooistBtn>
                  ) : (
                    <TattooistBtn>Follow</TattooistBtn>
                  )}
                  <TattooistBtn>Reserve</TattooistBtn>
                </TattooistControlBox>
              </TattooistContainer>
            ))}
          </TattooistMainBox>
        )}
      </ListDiv>
    </>
  );
};

export default SearchTattooist;
