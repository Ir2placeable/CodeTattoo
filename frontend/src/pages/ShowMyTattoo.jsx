import React from "react";
import {
  EmptyBox,
  MyTattooMainBox,
  MyTattooContainer,
} from "../styledComponents";
import MyTattoo from "../components/templates/MyTattoo";


/**
 * @file  
 * @returns 
 */

const ShowMyTattoo = ({tattoos}) => {
  return (
    <>
      {tattoos.length === 0 ? (
        <EmptyBox>No Tattoo</EmptyBox>
      ) : (
        <MyTattooMainBox>
          {tattoos &&
            tattoos.map((tattoo, idx) => (
              <MyTattooContainer key={idx}>
                <MyTattoo tattoo={tattoo}></MyTattoo>
              </MyTattooContainer>
            ))}
        </MyTattooMainBox>
      )}
    </>
  );
};

export default ShowMyTattoo;
