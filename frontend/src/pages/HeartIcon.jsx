import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as heartReqular } from '@fortawesome/free-regular-svg-icons';
import axios from 'axios';
import { APIURL } from '../config/key';
const apiUrl = APIURL;

const HeartIcon = ({ size, user_id ,draft_id, cookies }) => {
  const [heartClick, setHeartClick] = useState(false);

  // async function isFollowed(){
  //   console.log(draft_id)
  //   for(let i = 0; i < cookies.scraps.length; i++){
  //     if(cookies.scraps[i]._id === draft_id){
  //       console.log(draft_id, cookies.scraps[i]._id)
  //       setHeartClick(true);
  //       break;
  //     }
  //   }
  // }

  // useEffect(() => {
  //   isFollowed()
  // }, []);

  const heartIconStyle = {
    fontSize: `${size}px`,
    cursor: 'pointer',
    color: 'red'
  }

  const follow = async() => {
    const res = await axios.post(`${apiUrl}/user/scrap`, {
      user_id: user_id,
      draft_id: draft_id
    })
    console.log(res)

    if(res.data.success){
      const likes = cookies.scraps;
    }
  }
  const unfollow = async() => {
    const res = await axios.post();
  }

  const onHeartClick = () => {
    setHeartClick(heartClick ? false : true);
    console.log('heart', heartClick)
    console.log('draft_id: ', draft_id)

    if(heartClick){
      unfollow();
    } else {
      follow();
    }
  }

  return (
    <>
      <FontAwesomeIcon
        onClick={onHeartClick}
        style={heartIconStyle}
        icon={heartClick ? faHeart : heartReqular}  />
    </>
  );
};

export default React.memo(HeartIcon);