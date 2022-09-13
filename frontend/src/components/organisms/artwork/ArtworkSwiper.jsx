import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, Scrollbar, A11y } from "swiper";
import styled from "styled-components";
import ArtworkStateUnit from "../../atomic/artwork/ArtworkStateUnit";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/scrollbar";

const ArtworkSwiper = ({ states }) => {
  const title = ["예약 확정", "작업 시작", "작업 완료"];
  return (
    <>
      <StyledSwiper
        slidesPerView={3}
        spaceBetween={30}
        pagination={{ clickable: true }}
        navigation
        modules={[Pagination, Navigation, Scrollbar, A11y]}
      >
        {states
          .slice(0)
          .reverse()
          .map((state, idx) => (
            <SwiperSlide key={state.Record.activator_id}>
              <StateBox>
                <StateTitle>{`${state.Record.state} : ${title[idx]}`}</StateTitle>
                <StateContentBox>
                  <ArtworkStateUnit title={"비용"} text={state.Record.cost} />
                  <ArtworkStateUnit
                    title={"부위"}
                    text={state.Record.body_part}
                  />
                  {state.Record.state === 1 ? null : (
                    <>
                      <ArtworkStateUnit
                        title={"잉크"}
                        text={state.Record.inks}
                      />
                      <ArtworkStateUnit
                        title={"머신"}
                        text={state.Record.machine}
                      />
                      <ArtworkStateUnit
                        title={"깊이"}
                        text={state.Record.depth}
                      />
                      <ArtworkStateUnit
                        title={"바늘"}
                        text={state.Record.niddle}
                      />
                    </>
                  )}
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
  height: 315px;
`;

export const StateBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  box-shadow: 5px 5px 10px 0 rgba(72, 72, 72, 0.3);
  border-radius: 8px;
  background-color: white;
  height: 310px;
  align-items: center;
`;

export const StateTitle = styled.div`
  position: relative;
  line-height: 30px;
  flex-basis: 30px;
  font-weight: 700;
  font-size: 24px;
  text-align: center;
  margin-bottom: 10px;
`;

export const StateContentBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 270px;
`;
