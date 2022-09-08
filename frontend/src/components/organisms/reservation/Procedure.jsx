import React from 'react';
import { useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { getCookie } from '../../../config/cookie';
import useProcedure from '../../../hooks/useProcedure';
import { 
  ListDiv, ProcedureDiv, ProcedureImg,
  ProcedureInfo, ProcedureText, ProcedureBox,
  ProcedureLabel, ProcedureData,
  ProcedureWrap,
  ProcedureBigWrap,
  ProcedureBtns, ProcedureBtn, ProcedureDesc,
  ProcedureInput, GoListDiv, ProcedureImgDiv, 
  ProcedureEdit
} from '../../../styledComponents';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faGear } from '@fortawesome/free-solid-svg-icons';
import EditProcedureInfo from './EditProcedureInfo';
import EditProcedureImg from './EditProcedureImg';
import useReservation from '../../../hooks/useReservation';
import { useEffect } from 'react';
import useReservationDetail from '../../../hooks/useReservationDetail';
import useConfirmReservation from '../../../hooks/useConfirmReservation';
import Popup from '../draft/Popup';

const Procedure = () => {
  const [reservation, procedureInfo] = useReservationDetail();
  const [imgEdit, setImgEdit] = useState(false);
  const [infoEdit, setInfoEdit] = useState(false);

  const [procedureStatus, setProcedureStatus] = useState(false);
  const params = useParams();
  const reservation_id = params.reservation_id;

  const { state } = useLocation();
  // const { data, date, cost } = state
  const id = getCookie("tattooist_id")
  const nickname = getCookie('nickname')

  const [img, setImg] = useState({
    image: '',
    mime: ''
  })

  const [inputs, setInputs] = useState({
    inks: '', 
    niddle: '', 
    depth: '', 
    machine: ''
  })
  const [tattooId, setTattooId] = useState('');
  const { inks, niddle, depth, machine } = inputs
  const [startProcedure, endProcedure] = useProcedure();
  // const [inputs2, setInputs2] = useState({
  //   date: String(state.date),
  //   time_slot: String(state.time_slot),
  //   cost: String(state.cost),
  //   body_part: state.body_part
  // })
  const [inputs2, setInputs2] = useState({
    date: '',
    time_slot: '',
    cost: '',
    body_part: ''
  })
  const { date, time_slot, cost, body_part } = inputs2;

  // Popup.jsx props: text, onRequest
  const [data, setData] = useState({})
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    // setInputs(procedureInfo)
    console.log(procedureInfo)
  }, [procedureInfo])

  useEffect(() => {
    let d = String(reservation.date);
    if(d === 'undefined'){
      d = ''
    }
    let t = String(reservation.time_slot)
    if(t === 'undefined'){
      t = ''
    }
    let c = String(reservation.cost)
    if(c === 'undefined'){
      c = ''
    }

    setInputs2({
      date: d,
      time_slot: t,
      cost: c,
      body_part: reservation.body_part
    })

    console.log('reservation: ',reservation)
  }, [reservation])

  const navigate = useNavigate();
  const onChange = (e) => {
    const { name, value } = e.target;

    setInputs({
      ...inputs, 
      [name]: value
    })
  }

  const onChange2 = (e) => {
    const { name, value } = e.target;

    setInputs2({
      ...inputs2,
      [name]: value
    })
  }

  const onEnd = () => {
    endProcedure({
      reservation_id,
      user_id: reservation.customer_id,
      tattooist_id: id,
      inks, niddle, depth, machine
    })

    setProcedureStatus(false)

    // setTimeout(() => {
    //   window.location.replace('/reservations')
    // }, 500)
  }

  const onStart = () => {
    startProcedure({
      reservation_id,
      user_id: reservation.customer_id,
      tattooist_id: id,
      inks, niddle, depth, machine
    })

    // setTattooId(tattoo_id);
    setProcedureStatus(true);
  }

  // console.log(state);
  // console.log(tattooId)

  const [confirmReservation, rejectReservation] = useConfirmReservation({
    user_id: state.customer_id,
    tattooist_id: id
  });

  const onConfirm = () => {
    if(!date || !time_slot || !cost || !body_part){
      alert('모든 예약 정보를 입력해주세요!')
      return;
    } else if(!state.image && (!img.image || !img.mime)) {
      alert('예약 도안 이미지를 업로드해주세요!')
      return;
    }else {
      setIsOpen(true);
      setData({
        text: '정말로 이 예약을 확정하시겠습니까?',
        onRequest: function(){
          confirmReservation();
          window.location.replace('/reservations')
        }
      })
    }
  }

  const onReject = () => {
    // rejectReservation()
    setIsOpen(true)
    setData({
      text: '정말로 이 예약을 거절하시겠습니까?',
      onRequest: function(){
        rejectReservation()
        window.location.replace("/reservations")
      }
    })
  }

  return (
    <>

      {imgEdit && (
        <EditProcedureImg setImgEdit={setImgEdit}
          _src={reservation.image}
          data={img} setData={setImg} />
      )}
      {infoEdit && (
        <EditProcedureInfo setInfoEdit={setInfoEdit}
          date={date} time_slot={time_slot}
          cost={cost} body_part={body_part}
          onChange={onChange2} />
      )}

    <GoListDiv onClick={() => { navigate('/reservations') }}>
      <FontAwesomeIcon icon={faBars} style={{marginRight: '5px'}} />
      목록
    </GoListDiv>

    <ListDiv>
      <ProcedureDiv>

        <ProcedureImgDiv>
          {!reservation.confirmed && (
            <ProcedureEdit>
              <FontAwesomeIcon 
                onClick={() => setImgEdit(true)} icon={faGear} />
            </ProcedureEdit>
          )}
          <ProcedureImg src={reservation.image} />
        </ProcedureImgDiv>

        <ProcedureInfo>

          <ProcedureBox size="small">
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

          <ProcedureBox size="small">
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

            <ProcedureText>
              예약 정보
              {!reservation.confirmed && (
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

          {reservation.confirmed && (
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

            {/* {procedureStatus ? (
              <>
                <ProcedureBigWrap>
                  <ProcedureWrap >
                    <ProcedureLabel>사용기기</ProcedureLabel>
                    <ProcedureData>{machine}</ProcedureData>
                  </ProcedureWrap>
                  <ProcedureWrap >
                    <ProcedureLabel>사용바늘</ProcedureLabel>
                    <ProcedureData>{niddle}</ProcedureData>
                  </ProcedureWrap>
                </ProcedureBigWrap>

                <ProcedureBigWrap>
                  <ProcedureWrap >
                    <ProcedureLabel>주사깊이</ProcedureLabel>
                    <ProcedureData>{depth}</ProcedureData>
                  </ProcedureWrap>
                  <ProcedureWrap >
                    <ProcedureLabel>사용잉크</ProcedureLabel>
                    <ProcedureData>{inks}</ProcedureData>
                  </ProcedureWrap>
                </ProcedureBigWrap>
              </>
            ) : (
              <>
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
              </>
            )} */}
          </ProcedureBox>
          )}

        </ProcedureInfo>

        <ProcedureBtns>
          {reservation.confirmed ? procedureStatus ? (
            <ProcedureBtn color="purple" onClick={onEnd}>
              작업 종료
            </ProcedureBtn>
          ) : (
            <ProcedureBtn onClick={onStart}>
              작업 시작
            </ProcedureBtn>
          ) : (
            <>
              <ProcedureBtn color="red" onClick={onReject}>
                예약 취소
              </ProcedureBtn>
              <ProcedureBtn color="green" onClick={onConfirm}>
                예약 확정
              </ProcedureBtn>
            </>
          )}
        </ProcedureBtns>

      </ProcedureDiv>
    </ListDiv>

    {isOpen && (
      <Popup data={data} setIsOpen={setIsOpen} />
    )}
    </>
  );
};

export default Procedure;