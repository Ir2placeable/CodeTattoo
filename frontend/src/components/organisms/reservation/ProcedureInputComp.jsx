import React from 'react';

import { 
  ProcedureText, ProcedureBox,
  ProcedureLabel, 
  ProcedureWrap,
  ProcedureBigWrap, ProcedureDesc,
  ProcedureInput, 
} from '../../../styledComponents';

const ProcedureInputComp = ({
  procedureStatus, machine, niddle, depth, inks,
  onChange
}) => {
  return (
    <>
      <ProcedureBox size="big">
        <ProcedureText>
          시술 정보 
          {procedureStatus ? (
            <ProcedureDesc>
              작업 종료 후, 작업 종료 버튼을 눌러주세요.
            </ProcedureDesc>
          ) : (
            <ProcedureDesc>
              직접 입력 후 작업 시작 버튼을 눌러주세요.
            </ProcedureDesc>
          )}
        </ProcedureText>
        <ProcedureBigWrap>
          <ProcedureWrap >
            <ProcedureLabel>사용기기</ProcedureLabel>
            <ProcedureInput 
              type="text"
              name='machine'
              value={machine}
              onChange={onChange}
            />
          </ProcedureWrap>
          <ProcedureWrap >
            <ProcedureLabel>사용바늘</ProcedureLabel>
            <ProcedureInput 
              type="text"
              name='niddle'
              value={niddle}
              onChange={onChange}
            />
          </ProcedureWrap>
        </ProcedureBigWrap>
        <ProcedureBigWrap>
          <ProcedureWrap >
            <ProcedureLabel>주사깊이</ProcedureLabel>
            <ProcedureInput 
              type="text"
              name='depth'
              value={depth}
              onChange={onChange}
            />
          </ProcedureWrap>
          <ProcedureWrap >
            <ProcedureLabel>사용잉크</ProcedureLabel>
            <ProcedureInput 
              type="text"
              name='inks'
              value={inks}
              onChange={onChange}
            />
          </ProcedureWrap>
        </ProcedureBigWrap>

      </ProcedureBox>
    </>
  );
};

export default ProcedureInputComp;