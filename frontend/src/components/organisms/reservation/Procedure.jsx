import React from 'react';
import { useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { getCookie } from '../../../config/cookie';
import useProcedure from '../../../hooks/useProcedure';
import { 
  ListDiv, ProcedureDiv, ProcedureImg,
  ProcedureInfo, ProcedureBtns, ProcedureBtn, 
  GoListDiv, ProcedureImgDiv, ProcedureEdit,
  ContentsDiv
} from '../../../styledComponents';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faGear } from '@fortawesome/free-solid-svg-icons';
import EditProcedureInfo from './EditProcedureInfo';
import EditProcedureImg from './EditProcedureImg';
import { useEffect } from 'react';
import useReservationDetail from '../../../hooks/useReservationDetail';
import useConfirmReservation from '../../../hooks/useConfirmReservation';
import Popup from '../draft/Popup';
import ProcedureInputComp from './ProcedureInputComp';
import TattooistCustomerInfo from './TattooistCustomerInfo';
import ProcedureReservationInfo from './ProcedureReservationInfo';

/** 예약/작업 상세 페이지
 */
const Procedure = () => {
  // 예약정보, 작업정보
  const [reservation, procedureInfo] = useReservationDetail();
  // 도안 수정 클릭 여부 상태
  const [imgEdit, setImgEdit] = useState(false);
  // 예약 정보 수정 클릭 여부 상태
  const [infoEdit, setInfoEdit] = useState(false);
  // 작업 상태 
  const [procedureStatus, setProcedureStatus] = useState(false);
  const params = useParams();
  const reservation_id = params.reservation_id;

  const { state } = useLocation();
  const id = getCookie("tattooist_id")
  const nickname = getCookie('nickname')

  // 도안 수정시, 선택된 이미지 base64 형식 데이터 상태
  const [img, setImg] = useState({
    image: '',
    mime: ''
  })

  // 잉크, 바늘, 주사깊이, 사용기기 상태
  const [inputs, setInputs] = useState({
    inks: '', 
    niddle: '', 
    depth: '', 
    machine: ''
  })
  const { inks, niddle, depth, machine } = inputs

  // 예약 날짜, 시간, 가격, 시술 부위 상태
  const [inputs2, setInputs2] = useState({
    date: '',
    time_slot: '',
    cost: '',
    body_part: ''
  })
  const { date, time_slot, cost, body_part } = inputs2;

  // Popup.jsx props: text, onRequest
  // 팝업 데이터, 열림 상태
  const [data, setData] = useState({})
  const [isOpen, setIsOpen] = useState(false)

  // 작업 시작, 작업 종료 api 함수
  const [startProcedure, endProcedure] = useProcedure();

  useEffect(() => {
    if(procedureInfo){
      setInputs({
        niddle: procedureInfo.niddle,
        inks: procedureInfo.inks,
        machine: procedureInfo.machine,
        depth: procedureInfo.depth
      })
    }
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
    setProcedureStatus(reservation.procedure_status)
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
      user_id: state.customer_id,
      tattooist_id: id,
      inks, niddle, depth, machine
    })
    .then(() => {
      setProcedureStatus(false)

      window.location.replace('/#/reservations/confirmed')
    })
  }

  const onStart = () => {
    if(!inks || !niddle || !depth || !machine){
      alert('모든 시술 정보를 입력해주세요!')
      return;
    }

    startProcedure({
      reservation_id,
      user_id: state.customer_id,
      tattooist_id: id,
      inks, niddle, depth, machine
    })

    setProcedureStatus(true);
  }

  // 예약 확정, 예약 취소 api 함수
  const [confirmReservation, rejectReservation] = useConfirmReservation({
    user_id: state.customer_id,
    tattooist_id: id
  });

  const onConfirm = () => {
    if(!date || !time_slot || !cost || !body_part){
      alert('모든 예약 정보를 입력해주세요!')
      return;
    } else if(!reservation.image && (!img.image || !img.mime)) {
      alert('예약 도안 이미지를 업로드해주세요!')
      return;
    }else {
      setIsOpen(true);
      setData({
        text: '정말로 이 예약을 확정하시겠습니까?',
        onRequest: function(){
          confirmReservation()
          .then(() => [
            window.location.replace('/#/reservations/confirmed')
          ])
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
        .then(() => {
          window.location.replace("/#/reservations/pending")
        })
      }
    })
  }

  const goList = () => {
    if(reservation.confirmed){
      navigate('/reservations/confirmed')
    } else {
      navigate('/reservations/pending')
    }
  }

  return (
    <>
  <ContentsDiv>
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

    <GoListDiv onClick={goList}>
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

          <TattooistCustomerInfo 
            tattooist_id={id}
            tattooist_nickname={nickname}
            customer_id={state.customer_id}
            customer_nickname={state.customer_nickname}
          />

          <ProcedureReservationInfo 
            confirmed={reservation.confirmed}
            setInfoEdit={setInfoEdit}
            date={date}
            time_slot={time_slot}
            cost={cost}
            body_part={body_part}
          />

          {reservation.confirmed && (
            <ProcedureInputComp 
              procedureStatus={procedureStatus}
              machine={machine} niddle={niddle}
              depth={depth} inks={inks}
              onChange={onChange}
            />
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
  </ContentsDiv>
    </>
  );
};

export default Procedure;