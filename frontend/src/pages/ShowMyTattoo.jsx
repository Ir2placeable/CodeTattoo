import React from "react";
import {
  EmptyBox,
  MyTattooMainBox,
  MyTattooContainer,
} from "../styledComponents";
import MyTattoo from "../components/templates/MyTattoo";

const ShowMyTattoo = ({tattoos}) => {
  return (
    <>
      {tattoos.length === 0 ? (
        <EmptyBox>No Tattoo</EmptyBox>
      ) : (
        <MyTattooMainBox>
          {tattoos &&
            tattoos.map((tattoo) => (
              <MyTattooContainer key={"a"}>
                <MyTattoo tattoo={tattoo}></MyTattoo>
              </MyTattooContainer>
            ))}
        </MyTattooMainBox>
      )}
    </>
  );
};

export default ShowMyTattoo;
