import React from 'react';
import { 
  ListDiv, ProcedureDiv, ProcedureImg,
  ProcedureInfo, ProcedureText, ProcedureBox,
  ProcedureLabel, ProcedureData,
  ProcedureWrap,
  ProcedureBigWrap,
  ProcedureBtns, ProcedureBtn
} from '../../../styledComponents';

const Procedure = () => {
  return (
    <>
    <ListDiv>
      <ProcedureDiv>
        
        <ProcedureImg src='../../img/react.jpg' />

        <ProcedureInfo>

          <ProcedureBox>
            <ProcedureText>시술자 정보</ProcedureText>
            <ProcedureWrap>
              <ProcedureLabel>ID</ProcedureLabel>
              <ProcedureData>1234567890</ProcedureData>
            </ProcedureWrap>
            <ProcedureWrap>
              <ProcedureLabel>닉네임</ProcedureLabel>
              <ProcedureData>타투아영</ProcedureData>
            </ProcedureWrap>
          </ProcedureBox>

          <ProcedureBox>
            <ProcedureText>피시술자 정보</ProcedureText>
            <ProcedureWrap>
              <ProcedureLabel>ID</ProcedureLabel>
              <ProcedureData>1234567890</ProcedureData>
            </ProcedureWrap>
            <ProcedureWrap>
              <ProcedureLabel>닉네임</ProcedureLabel>
              <ProcedureData>유저아영</ProcedureData>
            </ProcedureWrap>
          </ProcedureBox>

          <ProcedureBox size="big">
            <ProcedureText>예약 정보</ProcedureText>
            <ProcedureBigWrap>
              <ProcedureWrap >
                <ProcedureLabel>Date</ProcedureLabel>
                <ProcedureData>2022.08.16 11시</ProcedureData>
              </ProcedureWrap>
              <ProcedureWrap >
                <ProcedureLabel>Cost</ProcedureLabel>
                <ProcedureData>200,000 won</ProcedureData>
              </ProcedureWrap>
            </ProcedureBigWrap>

            <ProcedureBigWrap>
              <ProcedureWrap >
                <ProcedureLabel>사용기기</ProcedureLabel>
                <ProcedureData>기기</ProcedureData>
              </ProcedureWrap>
              <ProcedureWrap >
                <ProcedureLabel>사용바늘</ProcedureLabel>
                <ProcedureData>바늘</ProcedureData>
              </ProcedureWrap>
            </ProcedureBigWrap>

            <ProcedureBigWrap>
              <ProcedureWrap >
                <ProcedureLabel>주사깊이</ProcedureLabel>
                <ProcedureData>3mm</ProcedureData>
              </ProcedureWrap>
              <ProcedureWrap >
                <ProcedureLabel>사용잉크</ProcedureLabel>
                <ProcedureData>블랙</ProcedureData>
              </ProcedureWrap>
            </ProcedureBigWrap>

          </ProcedureBox>

        </ProcedureInfo>

        <ProcedureBtns>
          <ProcedureBtn color='gray'>정보 수정</ProcedureBtn>
          <ProcedureBtn>작업 시작</ProcedureBtn>
        </ProcedureBtns>

      </ProcedureDiv>
    </ListDiv>
    </>
  );
};

export default Procedure;