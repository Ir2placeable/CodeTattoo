import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, Scrollbar, A11y } from "swiper";
import styled from "styled-components";
import StateUnit from "../atomic/artwork/StateUnit";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/scrollbar";

const ArtworkSwiper = ({ states }) => {
    console.log(states);
  return (
    <>
      <StyledSwiper
        slidesPerView={3}
        spaceBetween={30}
        pagination={{ clickable: true }}
        navigation
        modules={[Pagination, Navigation, Scrollbar, A11y]}
      >
        {states.slice(0).reverse().map((state) => (
          <SwiperSlide key={state.Record.activator_id}>
            <StateBox >
              <StateTitle>{state.Record.state}</StateTitle>
              <StateContentBox>
                <StateUnit title={"비용"} text={state.Record.cost} />
                <StateUnit title={"부위"} text={state.Record.body_part} />
                <StateUnit title={"잉크"} text={state.Record.inks} />
                <StateUnit title={"바늘"} text={state.Record.niddle} />
                <StateUnit title={"머신"} text={state.Record.machine} />
              </StateContentBox>
            </StateBox>
          </SwiperSlide>
        ))}
      </StyledSwiper>
    </>
  );
};

export default ArtworkSwiper;

export const StyledSwiper = styled(Swiper)`
  width: 910px;
  height: 290px;
`;

export const StateBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-shadow: 5px 5px 10px 0 rgba(72, 72, 72, 0.3);
  border-radius: 8px;
  background-color: white;
  height: 280px;
`;

export const StateTitle = styled.div`
  position: relative;
  line-height: 30px;
  flex-basis: 30px;
  font-weight: 700;
  font-size: 24px;
  margin-bottom: 10px;
`;

export const StateContentBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  flex-basis: 250px;
`;
