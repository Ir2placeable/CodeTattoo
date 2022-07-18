import React, { useState, useEffect } from "react";
import {
  ContentsDiv,
  EmptyBox,
  ListDiv,
  MyTattooMainBox,
  MyTattooImg,
  MyTattooContainer,
  MyTattooBtn,
  MyTattooStateBox,
} from "../styledComponents";
import useMyTattoo from "../hooks/useMyTattoo";
import MyTattoo from "../components/templates/MyTattoo";

const ShowMyTattoo = ({ cookies }) => {
  const tattoos = useMyTattoo(cookies);

  return (
    <>
      <ContentsDiv>
        <ListDiv>
          <MyTattooMainBox>
            {tattoos.map((tattoo) => (
              <MyTattooContainer key={tattoo.tattoo_id}>
                <MyTattoo tattoo={tattoo}></MyTattoo>
              </MyTattooContainer>
            ))}
          </MyTattooMainBox>
        </ListDiv>
      </ContentsDiv>
    </>
  );
};

export default ShowMyTattoo;
