import React from 'react';
import {
  ChatBtn,
  ChatDraftImg,
  ChatDraftBox,
  ChatDraftInfoBox,
  ChatInputDiv,
  ChatReservationBox,
  ChatBtnBox,
  ChatDraftImgDiv,
  ProcedureBox,
  ProcedureText,
  ProcedureLabel,
  ProcedureData,
  ProcedureWrap,
  ChattingRoomDiv,
  DeletedReservationChatting
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
import { useOutletContext, useParams } from 'react-router-dom';
import { goChattingRoom, goReservConfirm, goReservPending } from '../../../config/navigate';


/**
 * 상위 컴포넌트 === Chatting.jsx
 * 채팅 페이지/ 채팅 예약 화면
 */
const ChattingReservation = () => {
  // 채팅 정보 
  const { data } = useOutletContext();
  // get 예약 정보 api
  const [reservation, ] = useReservationDetail();
  // '예약 취소/도안 수정/정보 수정/예약 확정' 버튼 보여짐 여부 상태
  const [showBtns, setShowBtns] = useState(true)
  // '도안 수정' 버튼 클릭 여부 상태
  const [imgEdit, setImgEdit] = useState(false)
  // '정보 수정' 버튼 클릭 여부 상태
  const [infoEdit, setInfoEdit] = useState(false)
  // 업로드할 이미지의 base64 형식 데이터 상태
  const [img, setImg] = useState({
    image: '',
    mime: ''
  })
  // 날짜, 시간, 가격, 부위 입력 상태
  const [inputs, setInputs] = useState({
    date: '',
    time_slot: '',
    cost: '',
    body_part: ''
  })
  const { date, time_slot, cost, body_part } = inputs

  // Popup
  // 팝업에 사용될 텍스트 & 함수
  const [item, setItem] = useState({})
  // 팝업 열림을 나타내는 상태
  const [isOpen, setIsOpen] = useState(false)

  // 예약 확정, 예약 취소 api
  const [confirmReservation, rejectReservation] = useConfirmReservation({
    user_id: data.opponet_id,
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

    if(reservation.confirmed || getCookie('user_id')){
      setShowBtns(false)
    } else if(!reservation.confirmed && getCookie('tattooist_id')){
      setShowBtns(true)
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
    } else if(!reservation.image && (!img.image || !img.mime)){
      alert("예약 도안 이미지를 업로드해주세요!")
      return;
    } else {
      setIsOpen(true)
      setItem({
        text: '정말로 이 예약을 확정하시겠습니까?',
        onRequest: function(){
          confirmReservation()
          .then(() => {
            goReservConfirm();
          })
        }
      })
    }
  }
  const onReject = () => {
    setIsOpen(true)
    setItem({
      text: '정말로 이 예약을 거절하시겠습니까?',
      onRequest: function(){
        rejectReservation()
        .then(() => {
          goReservPending();
        })
      }
    })
  }

  const params = useParams();
  const goRoom = () => {
    goChattingRoom(params.id, params.reservation_id);
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

    <ChattingRoomDiv>
      {Object.keys(reservation).length === 0 ? (
        <DeletedReservationChatting>
          삭제된 예약입니다.
        </DeletedReservationChatting>
      ) : (
      <ChatReservationBox >
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
      )}


      <ChatInputDiv type="back">
      {/* onClick={onPlusClick} */}
        <ChatBtn type="image" style={{marginLeft: '21px'}} onClick={goRoom} >
          <FontAwesomeIcon icon={faMinus} />
        </ChatBtn>
      </ChatInputDiv>

      {isOpen && (
        <Popup data={item} setIsOpen={setIsOpen} />
      )}
    </ChattingRoomDiv>
    
    </>
  )
};

export default ChattingReservation;