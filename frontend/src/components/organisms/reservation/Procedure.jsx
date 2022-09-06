import React from 'react';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { getCookie } from '../../../config/cookie';
import useProcedure from '../../../hooks/useProcedure';
import { 
  ListDiv, ProcedureDiv, ProcedureImg,
  ProcedureInfo, ProcedureText, ProcedureBox,
  ProcedureLabel, ProcedureData,
  ProcedureWrap,
  ProcedureBigWrap,
  ProcedureBtns, ProcedureBtn, ProcedureDesc,
  ProcedureInput, GoListDiv
} from '../../../styledComponents';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';

const Procedure = () => {
  const { state } = useLocation();
  // const { data, date, cost } = state
  const id = getCookie("tattooist_id")
  const nickname = getCookie('nickname')
  const [inputs, setInputs] = useState({
    inks: '', 
    niddle: '', 
    depth: '', 
    machine: ''
  })
  const [tattooId, setTattooId] = useState('');
  const { inks, niddle, depth, machine } = inputs
  const [startProcedure, endProcedure] = useProcedure();

  const navigate = useNavigate();
  const onChange = (e) => {
    const { name, value } = e.target;

    setInputs({
      ...inputs, 
      [name]: value
    })
  }

  const onClick = (e) => {

  }

  // console.log(state);

  return (
    <>
    <GoListDiv onClick={() => { navigate('/reservations') }}>
      <FontAwesomeIcon icon={faBars} style={{marginRight: '5px'}} />
      목록
    </GoListDiv>

    <ListDiv>
      <ProcedureDiv>
        
        <ProcedureImg src={state.image} />

        <ProcedureInfo>

          <ProcedureBox>
            <ProcedureText>시술자 정보</ProcedureText>
            <ProcedureWrap>
              <ProcedureLabel>ID</ProcedureLabel>
              <ProcedureData>{id}</ProcedureData>
            </ProcedureWrap>
            <ProcedureWrap>
              <ProcedureLabel>닉네임</ProcedureLabel>
              <ProcedureData>{nickname}</ProcedureData>
            </ProcedureWrap>
          </ProcedureBox>

          <ProcedureBox>
            <ProcedureText>피시술자 정보</ProcedureText>
            <ProcedureWrap>
              <ProcedureLabel>ID</ProcedureLabel>
              <ProcedureData>{state.customer_id}</ProcedureData>
            </ProcedureWrap>
            <ProcedureWrap>
              <ProcedureLabel>닉네임</ProcedureLabel>
              <ProcedureData>{state.customer_nickname}</ProcedureData>
            </ProcedureWrap>
          </ProcedureBox>

          <ProcedureBox size="big">
            <ProcedureText>예약 정보</ProcedureText>
            <ProcedureBigWrap>
              <ProcedureWrap >
                <ProcedureLabel>Date</ProcedureLabel>
                <ProcedureData>{state.date} {state.time_slot}</ProcedureData>
              </ProcedureWrap>
              <ProcedureWrap >
                <ProcedureLabel>Cost</ProcedureLabel>
                <ProcedureData>{state.cost} won</ProcedureData>
              </ProcedureWrap>
            </ProcedureBigWrap>
          </ProcedureBox>

          <ProcedureBox size="big" style={{marginBottom: '0'}}>
            <ProcedureText>
              시술 정보 
              <ProcedureDesc>
                직접 입력 후 작업 시작 버튼을 눌러주세요.
              </ProcedureDesc>
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

        </ProcedureInfo>

        <ProcedureBtns>
          <ProcedureBtn color='blue'>정보 수정</ProcedureBtn>
          <ProcedureBtn>작업 시작</ProcedureBtn>
        </ProcedureBtns>

      </ProcedureDiv>
    </ListDiv>
    </>
  );
};

export default Procedure;