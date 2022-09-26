import React from 'react';
import { 
  ProcedureText, ProcedureBox,
  ProcedureLabel, ProcedureData,
  ProcedureWrap,
} from '../../../styledComponents';

/** 상위 컴포넌트 === Procedure.jsx
 * 예약 페이지 / 피시술자, 시술자 정보 컴포넌트 
 * @param {String} tattooist_id 시술자 id
 * @param {String} tattooist_nickname 시술자 닉네임
 * @param {String} customer_id 피시술자 id
 * @param {String} customer_nickname 피시술자 닉네임
 */
const TattooistCustomerInfo = ({
  tattooist_id, tattooist_nickname, customer_id, customer_nickname
}) => {
  return (
    <>
      <ProcedureBox size="small">
        <ProcedureText>시술자 정보</ProcedureText>
        <ProcedureWrap>
          <ProcedureLabel>ID</ProcedureLabel>
          <ProcedureData>{tattooist_id}</ProcedureData>
        </ProcedureWrap>
        <ProcedureWrap>
          <ProcedureLabel>닉네임</ProcedureLabel>
          <ProcedureData>{tattooist_nickname}</ProcedureData>
        </ProcedureWrap>
      </ProcedureBox>


      <ProcedureBox size="small">
        <ProcedureText>피시술자 정보</ProcedureText>
        <ProcedureWrap>
          <ProcedureLabel>ID</ProcedureLabel>
          <ProcedureData>{customer_id}</ProcedureData>
        </ProcedureWrap>
        <ProcedureWrap>
          <ProcedureLabel>닉네임</ProcedureLabel>
          <ProcedureData>{customer_nickname}</ProcedureData>
        </ProcedureWrap>
      </ProcedureBox>
    </>
  );
};

export default React.memo(TattooistCustomerInfo);