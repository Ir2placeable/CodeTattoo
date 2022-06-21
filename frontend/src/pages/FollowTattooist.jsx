import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as heartReqular } from '@fortawesome/free-regular-svg-icons';
import { APIURL } from '../config/key';
import axios from 'axios';
const apiUrl = APIURL;
const heartIconStyle = {
  fontSize: `30px`,
  cursor: 'pointer',
  color: 'red'
}

const FollowTattooist = ({ user_id, tattooist_id, cookies }) => {
  const [heartClick, setHeartClick] = useState(false);

  async function isFollowed(){
    console.log(tattooist_id);
    for(let i = 0; i < cookies.following.length; i++){
      if(cookies.following[i].tattooist_id === tattooist_id){
        setHeartClick(true);
        break;
      }
    }
  }
  useEffect(() => {
    isFollowed();
  }, []);

  const follow = async() => {
    const res = await axios.post()
  }
  const unfollow = async() => {
    const res = await axios.post()
  }

  const onHeartClick = () => {
    setHeartClick(heartClick ? false : true);

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
       icon={heartClick ? faHeart : heartReqular} />
    </>
  );
};

export default FollowTattooist;