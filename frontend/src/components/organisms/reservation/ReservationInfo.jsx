import React from 'react';
import { 
   ReservInfoDiv, ReservDraftImg,
  ReservText, ReservTextDiv, ReservLabel,
  ReservTextBox, ReservDraftEmptyImg, ReservStateBtn
} from '../../../styledComponents';

/** 상위 컴포넌트 === Reservation.jsx
 * 예약/작업 페이지 / 예약 카드 / 예약 정보 컴포넌트
 * @param {String} image 예약 도안 이미지 소스
 * @param {String} nickname 예약자 닉네임
 * @param {String} date 예약 날짜 및 시간
 * @param {String} cost 예약 가격
 * @param {Boolean} confirmed 예약 확정 여부
 * @param {Boolean} procedure_status 작업 시작 여부
 */
const ReservationInfo = ({
  image, nickname, date, cost, confirmed,
  procedure_status
}) => {
  return (
    <>
      <ReservInfoDiv>
        {image ? (
          <ReservDraftImg src={image} />
        ) : (
          <ReservDraftEmptyImg>
            미확정
          </ReservDraftEmptyImg>
        )}

        <ReservTextDiv>
          <ReservText>
            <ReservLabel>Customer</ReservLabel>
            <ReservTextBox>{nickname}</ReservTextBox>
          </ReservText>
          <ReservText>
            <ReservLabel>예약 일정</ReservLabel>
            <ReservTextBox>{date}</ReservTextBox>
          </ReservText>
          <ReservText>
            <ReservLabel>작업 가격</ReservLabel>
            <ReservTextBox>{cost}</ReservTextBox>
          </ReservText>
        </ReservTextDiv>

        {confirmed ? procedure_status ? (
          <ReservStateBtn color="blue">
            작업중
          </ReservStateBtn>
        ) : (
          <ReservStateBtn color="green">
            예약확정 완료
          </ReservStateBtn>
        ) : (
          <ReservStateBtn color="red">
            예약확정 대기중
          </ReservStateBtn>
        )}

      </ReservInfoDiv>
    </>
  );
};

export default React.memo(ReservationInfo);