import React, { useState, useEffect } from "react";
import {
  ContentsDiv,
  EmptyBox,
  ListDiv,
  MyTattooMainBox,
  MyTattooContainer,
} from "../styledComponents";
import useMyTattoo from "../hooks/useMyTattoo";
import MyTattoo from "../components/templates/MyTattoo";

const ShowMyTattoo = () => {
  console.log("Show MyTattoo");
  //const tattoos = useMyTattoo();
  const tattoos = [
    {
      tattoo_id: 1,
      state: [
        { id: 1, title: "STATE1", content: "Recover" },
        { id: 2, title: "STATE2", content: "Retouch" },
        { id: 3, title: "STATE3", content: "Tattoo" },
        { id: 4, title: "STATE4", content: "Final" },
      ],
      tattooist_id: 101,
    },
    {
      tattoo_id: 2,
      state: [
        { id: 1, title: "STATE1", content: "Recover" },
        { id: 2, title: "STATE2", content: "Retouch" },
        { id: 3, title: "STATE3", content: "Tattoo" },
        { id: 4, title: "STATE4", content: "Final" },
      ],
      tattooist_id: 102,
    },
    {
      tattoo_id: 3,
      state: [
        { id: 1, title: "STATE1", content: "Recover" },
        { id: 2, title: "STATE2", content: "Retouch" },
        { id: 3, title: "STATE3", content: "Tattoo" },
        { id: 4, title: "STATE4", content: "Final" },
      ],
      tattooist_id: 103,
    },
  ];
  return (
    <>
      <ContentsDiv>
        <ListDiv>
          {tattoos.length === 0 ? (
            <EmptyBox>No Tattoo</EmptyBox>
          ) : (
            <MyTattooMainBox>
              {tattoos.map((tattoo) => (
                <MyTattooContainer key={tattoo.tattoo_id}>
                  <MyTattoo tattoo={tattoo}></MyTattoo>
                </MyTattooContainer>
              ))}
            </MyTattooMainBox>
          )}
        </ListDiv>
      </ContentsDiv>
    </>
  );
};

export default ShowMyTattoo;
