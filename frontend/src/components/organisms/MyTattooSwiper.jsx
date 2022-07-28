import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, Scrollbar, A11y } from "swiper";
import styled from "styled-components";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/scrollbar";

const MyTattooSwiper = ({ states }) => {
  return (
    <>
      <StyledSwiper
        slidesPerView={3}
        spaceBetween={30}
        pagination={{ clickable: true }}
        navigation
        modules={[Pagination, Navigation, Scrollbar, A11y]}
      >
        {states.map((state) => (
          <SwiperSlide key={state.id}>
            <StateBox>
              <StateTitle>{state.title}</StateTitle>
              <StateContent>{state.content}</StateContent>
            </StateBox>
          </SwiperSlide>
        ))}
      </StyledSwiper>
    </>
  );
};

export default MyTattooSwiper;

export const StyledSwiper = styled(Swiper)`
  width: 900px;
  height: 250px;
  box-shadow: 5px 5px 15px 0px rgba(72, 72, 72, 0.5);
`;

export const StateBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-shadow: 5px 5px 15px 0px rgba(72, 72, 72, 0.5);
`;

export const StateTitle = styled.div`
  position: relative;
`;

export const StateContent = styled.div`
  position: relative;
  line-height: 234px;
`;
