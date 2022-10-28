import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinus } from '@fortawesome/free-solid-svg-icons';
import React, { useEffect, useState } from 'react';
import { getCookie } from '../../../config/cookie';
import useMyTattoo from '../../../hooks/useMyTattoo';
import { 
  ChatBtn,
  ChatInputDiv, ChattingMyTattooDiv, 
  ChattingMyTattooImg, 
  ChattingMyTattooImgDiv, 
  ChattingRoomDiv, 
  DeletedReservationChatting
} from '../../../styledComponents';
import MyTattooItem from '../../atomic/chatting/MyTattooItem';
import { useOutletContext, useParams } from 'react-router-dom';
import { goChattingRoom } from '../../../config/navigate';
import { useContext } from 'react';
import { WebSocketContext } from '../../templates/Chatting';
import moment from 'moment';
import useSendChat from '../../../hooks/useSendChat';

const ChattingMyTattoo = () => {
  // 채팅 정보
  const { data } = useOutletContext();
  // 전역 웹소켓 변수
  const ws = useContext(WebSocketContext)

  // { user_id }, { tattoo_id, reservation_id }
  const [getMyTattoo, provideMyTattoo] = useMyTattoo()
  const [tattoos, setTattoos] = useState([])
  const [choices, setChoices] = useState([])
  const params = useParams();

  useEffect(() => {
    const user_id = getCookie('user_id')
    getMyTattoo({user_id})
      .then(res => {
        // [tattoos]: { tattoo_id, image }
        console.log(res);
        setTattoos(res)
        console.log(tattoos);
      })
  }, [])

  
  const onClick = (e, tattoo_id) => {
    let temp = choices;

    const dup = temp.findIndex(id => id === tattoo_id)

    if(dup !== -1){ // 이미 선택했을 때, 선택 해제
      temp = temp.filter(id => id !== tattoo_id)
      setChoices(temp)
      return false
    }

    temp.push(tattoo_id)
    setChoices(temp)
    return true
  }

  const goRoom = () => {
    goChattingRoom(params.id, params.reservation_id)
  }

  const sendChat = useSendChat();
  const sendChatting = async(tattoo_id) => {
    const sender = params.id;
    const reservation_id = params.reservation_id;
    const created_at = moment().format('YYYY년 MM월 DD일 HH:mm:ss')
    const body = {
      sender, 
      receiver: data.opponent_id,
      reservation_id, 
      content: '마이타투 이력이 전송되었습니다.',
      created_at,
      enter_room: false,
      is_image: false,
      tattoo_id
    }

    sendChat(body)
  }

  const onSendMyTattoo = () => {
    if(choices.length === 0){
      alert('마이타투 이력을 선택해주세요!')
      return;
    }

    // choices.forEach((choice) => {
    //   provideMyTattoo({
    //     tattoo_id: choice,
    //     reservation_id: params.reservation_id
    //   })
    //     .then(res => {
    //       if(!res){
    //         alert('마이타투 이력 전송 실패')
    //         return;
    //       }
    //     })
    // })
    
    choices.forEach((tattoo_id) => {
      sendChatting(tattoo_id)
    })
  }

  return (
    <>
      <ChattingRoomDiv state="mytattoo">
        {tattoos && tattoos.length === 0 ? (
          <DeletedReservationChatting style={{marginTop: '71px'}}>
            마이타투 이력이 없습니다. 
          </DeletedReservationChatting>
        ) : (
          <ChattingMyTattooDiv>
            {tattoos && tattoos.map(tattoo => (
              <MyTattooItem key={tattoo.tattoo_id}
                tattoo_id={tattoo.tattoo_id}
                image={tattoo.image}
                onClick={onClick}
              />
            ))}
          </ChattingMyTattooDiv>
        )}

        <ChatInputDiv type="back-two">
          <ChatBtn type="image" style={{marginLeft: '21px'}} onClick={goRoom}>
            <FontAwesomeIcon icon={faMinus} />
          </ChatBtn>
          <ChatBtn type="mytattoo" onClick={onSendMyTattoo}>
            나의 타투이력 제공
          </ChatBtn>
        </ChatInputDiv>
      </ChattingRoomDiv>
    </>
  );
};

export default ChattingMyTattoo;