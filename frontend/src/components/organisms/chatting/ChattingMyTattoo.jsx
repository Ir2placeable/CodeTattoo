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

const ChattingMyTattoo = () => {
  // 채팅 정보
  const { data } = useOutletContext();
  // console.log(data)

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
        setTattoos(res)
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

  const onSendMyTattoo = () => {
    if(choices.length === 0){
      alert('마이타투 이력을 선택해주세요!')
      return;
    }

    choices.forEach((choice) => {
      provideMyTattoo({
        tattoo_id: choice,
        reservation_id: params.reservation_id
      })
        .then(res => {
          if(!res){
            alert('마이타투 이력 전송 실패')
            return;
          }
        })
    })
    
  }

  return (
    <>
      <ChattingRoomDiv state="mytattoo">
        {tattoos.length === 0 ? (
          <DeletedReservationChatting style={{marginTop: '71px'}}>
            마이타투 이력이 없습니다. 
          </DeletedReservationChatting>
        ) : (
          <ChattingMyTattooDiv>
            {tattoos.map(tattoo => (
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