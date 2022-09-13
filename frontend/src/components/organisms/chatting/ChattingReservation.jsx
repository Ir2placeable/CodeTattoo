import React from 'react';
import {
  ChatBtn,
  ChatDraftImg,
  ChatDraftBox,
  ChatDraftInfoBox,
  ChatInputDiv,
  ChatReservationBox,
  ChatBtnBox,
  ChatDraftInfoLabel,
  ChatDraftInfoInput,
  ChatDraftInputDiv,
  ChatDraftImgDiv,
  ProcedureBox,
  ProcedureText,
  ProcedureLabel,
  ProcedureData,
  ProcedureWrap
} from "../../../styledComponents";

import { faMinus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import useReservationDetail from '../../../hooks/useReservationDetail';
import { useState, useEffect } from 'react';
import { getCookie } from '../../../config/cookie';
import useConfirmReservation from '../../../hooks/useConfirmReservation';
import EditProcedureImg from '../reservation/EditProcedureImg';
import EditProcedureInfo from '../reservation/EditProcedureInfo';
import Popup from '../draft/Popup';
import ProcedureReservationInfo from '../reservation/ProcedureReservationInfo';

const ChattingReservation = ({ user_id, onPlusClick }) => {
  const [reservation, ] = useReservationDetail();
  const [showBtns, setShowBtns] = useState(true)
  const [imgEdit, setImgEdit] = useState(false)
  const [infoEdit, setInfoEdit] = useState(false)
  const [img, setImg] = useState({
    image: '',
    mime: ''
  })
  const [inputs, setInputs] = useState({
    date: '',
    time_slot: '',
    cost: '',
    body_part: ''
  })
  const { date, time_slot, cost, body_part } = inputs

  // Popup
  const [data, setData] = useState({})
  const [isOpen, setIsOpen] = useState(false)

  
  const [confirmReservation, rejectReservation] = useConfirmReservation({
    user_id: user_id,
    tattooist_id: getCookie('tattooist_id')
  })

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

    setInputs({
      date: d,
      time_slot: t,
      cost: c,
      body_part: reservation.body_part
    })

    console.log('reservation: ',reservation)

    if(reservation.confirmed || getCookie('user_id')){
      setShowBtns(false)
    }

  }, [reservation])

  const onChange = (e) => {
    const { name, value } = e.target;
    setInputs({
      ...inputs,
      [name]: value
    })
  }

  const onConfirm = () => {
    if(!date || !time_slot || !cost || !body_part){
      alert("모든 예약 정보를 입력해주세요!")
      return;
    } else if(!reservation.iamge && (!img.image || !img.mime)){
      alert("예약 도안 이미지를 업로드해주세요!")
      return;
    } else {
      setIsOpen(true)
      setData({
        text: '정말로 이 예약을 확정하시겠습니까?',
        onRequest: function(){
          confirmReservation();
          window.location.replace('/#/reservations/confirmed')
        }
      })
    }
  }
  const onReject = () => {
    setIsOpen(true)
    setData({
      text: '정말로 이 예약을 거절하시겠습니까?',
      onRequest: function(){
        rejectReservation()
        window.location.replace("/#/reservations/pending")
      }
    })
  }

  return (
    <>
    {imgEdit && (
      <EditProcedureImg 
        setImgEdit={setImgEdit}
        _src={reservation.image}
        data={img} setData={setImg}
      />
    )}
    {infoEdit && (
      <EditProcedureInfo setInfoEdit={setInfoEdit}
      date={date} time_slot={time_slot}
      cost={cost} body_part={body_part}
      onChange={onChange}
      />
    )}
      <ChatReservationBox>
        <ChatDraftBox>
          {reservation.image ? (
            <ChatDraftImg src={reservation.image} />
          ) : (
            <ChatDraftImgDiv />
          )}

          <ChatDraftInfoBox>
            <ProcedureBox size="chat">
              <ProcedureText color="white">예약 정보</ProcedureText>

              <ProcedureWrap>
                <ProcedureLabel>날짜</ProcedureLabel>
                <ProcedureData>{date}</ProcedureData>
              </ProcedureWrap>

              <ProcedureWrap>
                <ProcedureLabel>시간</ProcedureLabel>
                <ProcedureData>{time_slot}</ProcedureData>
              </ProcedureWrap>

              <ProcedureWrap>
                <ProcedureLabel>가격</ProcedureLabel>
                <ProcedureData>{cost}</ProcedureData>
              </ProcedureWrap>

              <ProcedureWrap>
                <ProcedureLabel>부위</ProcedureLabel>
                <ProcedureData>{body_part}</ProcedureData>
              </ProcedureWrap>

            </ProcedureBox>
          </ChatDraftInfoBox>
        </ChatDraftBox>

        {showBtns && (
          <ChatBtnBox>
            <ChatBtn type="cancel" onClick={onReject}>
              예약 취소
            </ChatBtn>
            <ChatBtn type="modify" onClick={() => setImgEdit(true)}>
              도안 수정
            </ChatBtn>
            <ChatBtn type="modify" onClick={() => setInfoEdit(true)}>
              정보 수정
            </ChatBtn>
            <ChatBtn type="confirm" onClick={onConfirm}>
              예약 확정
            </ChatBtn>
          </ChatBtnBox>
        )}
      </ChatReservationBox>


      <ChatInputDiv type="back">
        <ChatBtn type="image" onClick={onPlusClick}>
          <FontAwesomeIcon icon={faMinus} />
        </ChatBtn>
      </ChatInputDiv>

      {isOpen && (
        <Popup data={data} setIsOpen={setIsOpen} />
      )}
    </>
  );
};

export default ChattingReservation;