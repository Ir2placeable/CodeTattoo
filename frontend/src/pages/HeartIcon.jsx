import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as heartReqular } from '@fortawesome/free-regular-svg-icons';


const HeartIcon = ({ size }) => {
  const [heartClick, setHeartClick] = useState(false);

  const heartIconStyle = {
    fontSize: `${size}px`,
    cursor: 'pointer',
    color: 'red'
  }

  const onHeartClick = () => {
    setHeartClick(heartClick ? false : true);
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