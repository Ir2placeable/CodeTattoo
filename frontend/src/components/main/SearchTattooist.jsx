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

const SearchTattooist = ({ cookies, filter }) => {
  const params = useParams();
  const nickname = params.nickname;

  const [page, setPage] = useState(1);
  const [pages, setPages] = useState([]);
  const [tattooists, setTattoists] = useState([]);
  const [noTattooist, setNoTattooist] = useState(false);

  const sendRequest = async () => {
    const res = await axios.get(
      `${APIURL}/tattooist/search/?user_id=${cookies.user_id}&nickname=${nickname}`
    );
    console.log(res);

    if (res.data.success) {
      setTattoists(res.data.tattooist_list);
    } else {
      // 검색 결과 없음
      setNoTattooist(true);
    }
  };

  useEffect(() => {
    sendRequest();
  }, []);

  return (
    <>
      <ListDiv>
        {!noTattooist ? (
          <EmptyBox>검색 결과가 없습니다.</EmptyBox>
        ) : (
          <TattooistMainBox>
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
        )}
      </ListDiv>
    </>
  );
};

export default SearchTattooist;
