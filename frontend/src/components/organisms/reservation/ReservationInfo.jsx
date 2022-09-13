import React from 'react';
import { 
   ReservInfoDiv, ReservDraftImg,
  ReservText, ReservTextDiv, ReservLabel,
  ReservTextBox, ReservDraftEmptyImg, ReservStateBtn
} from '../../../styledComponents';

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