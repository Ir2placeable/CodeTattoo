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
  width: 910px;
  height: 260px;
`;

export const StateBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-shadow: 5px 5px 10px 0 rgba(72, 72, 72, 0.3);
  border-radius: 8px;
  background-color: white;
`;

export const StateTitle = styled.div`
  position: relative;
  line-height: 30px;
  flex-basis: 30px;
`;

export const StateContent = styled.div`
  position: relative;
  line-height: 220px;
`;
