import React from 'react';
import { 
  ProcedureText, ProcedureBox,
  ProcedureLabel, ProcedureData,
  ProcedureWrap, ProcedureEdit,
  ProcedureBigWrap
} from '../../../styledComponents';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGear } from '@fortawesome/free-solid-svg-icons';

/** 상위 컴포넌트 === Procedure.jsx
 * 작업 정보(사용기기, 바늘, 주사 깊이, 잉크) input 컴포넌트
 * @param {Boolean} confirmed 예약 상태 
 * @param {Function} setInfoEdit 예약정보 수정 팝업 보여짐 상태 함수
 * @param {String} date 날짜
 * @param {String} time_slot 시간
 * @param {String} cost 비용
 * @param {String} body_part 시술 부위
 */
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