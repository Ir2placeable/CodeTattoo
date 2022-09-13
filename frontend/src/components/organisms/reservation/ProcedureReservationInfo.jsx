import React from 'react';
import { 
  ProcedureText, ProcedureBox,
  ProcedureLabel, ProcedureData,
  ProcedureWrap, ProcedureEdit,
  ProcedureBigWrap
} from '../../../styledComponents';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGear } from '@fortawesome/free-solid-svg-icons';

const ProcedureReservationInfo = ({
  confirmed,
  setInfoEdit, date, time_slot, cost, body_part,
}) => {
  return (
    <>
      <ProcedureBox size="big">

        <ProcedureText>
          예약 정보
          {!confirmed && (
            <ProcedureEdit type="normal">
              <FontAwesomeIcon 
                onClick={() => setInfoEdit(true)} icon={faGear} />
            </ProcedureEdit>
          )}
        </ProcedureText>
        <ProcedureBigWrap>
          <ProcedureWrap >
            <ProcedureLabel>날짜</ProcedureLabel>
            <ProcedureData>
              {date}
            </ProcedureData>
          </ProcedureWrap>
          <ProcedureWrap >
            <ProcedureLabel>시간</ProcedureLabel>
            <ProcedureData>
              {time_slot}
            </ProcedureData>
          </ProcedureWrap>
        </ProcedureBigWrap>
        <ProcedureBigWrap>
          <ProcedureWrap >
            <ProcedureLabel>비용</ProcedureLabel>
            <ProcedureData>
              {cost}
            </ProcedureData>
          </ProcedureWrap>
          <ProcedureWrap >
            <ProcedureLabel>시술부위</ProcedureLabel>
            <ProcedureData>{body_part}</ProcedureData>
          </ProcedureWrap>
        </ProcedureBigWrap>
      </ProcedureBox>
    </>
  );
};

export default React.memo(ProcedureReservationInfo);