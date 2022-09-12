import React from 'react';
import { 
  ProcedureText, ProcedureBox,
  ProcedureLabel, ProcedureData,
  ProcedureWrap,
} from '../../../styledComponents';

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