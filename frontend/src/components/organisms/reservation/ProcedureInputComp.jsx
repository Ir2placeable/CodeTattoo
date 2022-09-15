import React from 'react';

import { 
  ProcedureText, ProcedureBox,
  ProcedureLabel, 
  ProcedureWrap,
  ProcedureBigWrap, ProcedureDesc,
  ProcedureInput, 
} from '../../../styledComponents';

/** 상위 컴포넌트 === Procedure.jsx
 * 작업 정보(사용기기, 바늘, 주사 깊이, 잉크) input 컴포넌트
 * @param {Boolean} procedureStatus 작업 상태 
 * @param {String} machine 사용기기
 * @param {String} niddle 바늘
 * @param {String} depth 주사 깊이
 * @param {String} inks 잉크
 * @param {Function} onChange 입력값 감지 함수
 */
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