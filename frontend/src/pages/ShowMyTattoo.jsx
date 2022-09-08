import React from "react";
import {
  EmptyBox,
  MyTattooMainBox,
  MyTattooContainer,
} from "../styledComponents";
import MyTattoo from "../components/templates/MyTattoo";
import { useOutletContext } from "react-router-dom";

const ShowMyTattoo = () => {
  const { tattoos } = useOutletContext();
  return (
    <>
      {tattoos.length === 0 ? (
        <EmptyBox>No Tattoo</EmptyBox>
      ) : (
        <MyTattooMainBox>
          {tattoos &&
            tattoos.map((tattoo) => (
              <MyTattooContainer key={tattoo.tattoo_id}>
                <MyTattoo tattoo={tattoo}></MyTattoo>
              </MyTattooContainer>
            ))}
        </MyTattooMainBox>
      )}
    </>
  );
};

export default ShowMyTattoo;
