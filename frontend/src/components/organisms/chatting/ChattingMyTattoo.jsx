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
  ChattingRoomDiv 
} from '../../../styledComponents';
import MyTattooItem from '../../atomic/chatting/MyTattooItem';
import { useOutletContext } from 'react-router-dom';

const ChattingMyTattoo = () => {
  // 채팅 정보
  const { data } = useOutletContext();
  // console.log(data)

  // { user_id }, { tattoo_id, reservation_id }
  const [getMyTattoo, provideMyTattoo] = useMyTattoo()
  const [tattoos, setTattoos] = useState([])
  const [choices, setChoices] = useState([])

  useEffect(() => {
    const user_id = getCookie('user_id')
    getMyTattoo({user_id})
      .then(res => {
        // [tattoos]: { tattoo_id, image }
        setTattoos(res)
      })
  }, [])

  // border-color: #F7FF00;
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

  return (
    <>
      <ChattingRoomDiv state="mytattoo">
        <ChattingMyTattooDiv>
          <MyTattooItem tattoo_id={0} 
            image="../../img/react.jpg" 
            onClick={onClick}
          />

          <MyTattooItem tattoo_id={1} 
            image="../../img/react.jpg" 
            onClick={onClick}
          />

          <MyTattooItem tattoo_id={2} 
            image="../../img/react.jpg" 
            onClick={onClick}
          />

          <MyTattooItem tattoo_id={3} 
            image="../../img/react.jpg" 
            onClick={onClick}
          />

          <MyTattooItem tattoo_id={4} 
            image="../../img/react.jpg" 
            onClick={onClick}
          />

          <MyTattooItem tattoo_id={5} 
            image="../../img/react.jpg" 
            onClick={onClick}
          />

        </ChattingMyTattooDiv>

        <ChatInputDiv type="back-two">
          <ChatBtn type="image" style={{marginLeft: '21px'}}>
            <FontAwesomeIcon icon={faMinus} />
          </ChatBtn>
          <ChatBtn type="mytattoo">
            나의 타투이력 제공
          </ChatBtn>
        </ChatInputDiv>
      </ChattingRoomDiv>
    </>
  );
};

export default ChattingMyTattoo;