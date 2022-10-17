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

const ChattingMyTattoo = () => {
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
    // if(e.target !== e.currentTarget){
    //   return;
    // }
    
    let temp = choices;
    // const tattoo_id = e.target.id;
    console.log('click: ', tattoo_id)
    console.log(temp)

    const dup = temp.findIndex(id => id === tattoo_id)

    if(dup !== -1){ // 이미 선택했을 때, 선택 해제
      temp = temp.filter(id => id !== tattoo_id)
      e.target.style.border = '3px solid #646464';
      setChoices(temp)
      return;
    }

    temp.push(tattoo_id)
    e.target.style.border = '3px solid #f7ff00'
    setChoices(temp)
  }

  return (
    <>
      <ChattingRoomDiv state="mytattoo">
        <ChattingMyTattooDiv>

          <ChattingMyTattooImgDiv onClick={(e) => onClick(e, 1)}>
            <ChattingMyTattooImg src="../../img/react.jpg" />
          </ChattingMyTattooImgDiv>

          <ChattingMyTattooImgDiv onClick={(e) => onClick(e, 2)}>
            <ChattingMyTattooImg src="../../img/react.jpg" />
          </ChattingMyTattooImgDiv>

          <ChattingMyTattooImgDiv onClick={(e) => onClick(e, 3)}>
            <ChattingMyTattooImg src="../../img/react.jpg" />
          </ChattingMyTattooImgDiv>

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