import React from 'react';
import { 
  CircleXmarkStyle, 
  MyTattooPopupBox, MyTattooPopupDiv, MyTattooPopupHeader, 
  MyTattooPopupImg, 
} from '../../../styledComponents';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark } from '@fortawesome/free-regular-svg-icons';
import useMyTattoo from '../../../hooks/useMyTattoo';
import { useState } from 'react';
import { useEffect } from 'react';
import MyTattooState from '../../atomic/chatting/MyTattooState';
import { useParams } from 'react-router-dom';


const MyTattooPopup = ({ tattoo_id, setMyTattooClick }) => {
  const [, getMyTattooDetail] = useMyTattoo();
  const [history, setHistory] = useState([])
  const params = useParams();

  useEffect(() => {
    getMyTattooDetail({
      tattoo_id,
      reservation_id: params.reservation_id,
    })
      .then((res) => {
        if(!res){
          return;
        }
        setHistory(res)
      })
  }, [])

  return (
    <>
    {history.length !== 0 && (
      <MyTattooPopupDiv>

        <MyTattooPopupBox>
          <MyTattooPopupHeader>
            마이타투 이력

            <FontAwesomeIcon icon={faCircleXmark} 
              style={CircleXmarkStyle}
              onClick={() => setMyTattooClick(false)}
            />
          </MyTattooPopupHeader>
          
          <MyTattooPopupImg src={history[0].image} />

          {history.map((item) => (
            <MyTattooState 
              key={item.state}
              state={item.state}
              cost={item.cost} body_part={item.body_part}
              depth={item.depth} inks={item.inks}
              machine={item.machine} niddle={item.niddle}
            />
          ))}

        </MyTattooPopupBox>

      </MyTattooPopupDiv>
    )}
    </>
  );
};

export default MyTattooPopup;