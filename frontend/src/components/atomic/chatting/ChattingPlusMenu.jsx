import React, { memo, useCallback, useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAddressBook, faTag } from '@fortawesome/free-solid-svg-icons';
import { ChattingPlusItem, ChattingPlusMenuDiv } from '../../../styledComponents';
import { goChattingMyTattoo, goChattingReserv } from '../../../config/navigate';
import { getCookie } from '../../../config/cookie';

const margin = {
  marginLeft: '5px'
}
const ChattingPlusMenu = memo(({ id, reserv_id }) => {
  const [type, setType] = useState('')

  useEffect(() => {
    if(getCookie('tattooist_id')){
      setType('tattooist')
    } else if(getCookie('user_id')){
      setType('user')
    }
  }, [])

  const goMyTattoo = useCallback(() => {
    goChattingMyTattoo(id, reserv_id)
  }, [])

  const goReservation = useCallback(() => {
    goChattingReserv(id, reserv_id)
  })

  return (
    <>
      <ChattingPlusMenuDiv type={type}>
        <ChattingPlusItem onClick={goReservation}>
          예약 정보 확인
          <FontAwesomeIcon icon={faTag} style={margin} />
        </ChattingPlusItem>

        {type === "user" && (
          <ChattingPlusItem onClick={goMyTattoo}>
            마이타투 이력 전송
            <FontAwesomeIcon icon={faAddressBook} style={margin} />
          </ChattingPlusItem>
        )}
      </ChattingPlusMenuDiv> 
    </>
  );
});

export default ChattingPlusMenu;