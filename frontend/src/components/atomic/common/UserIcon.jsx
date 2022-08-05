import React, { memo } from 'react';
import { UserIconStyle } from '../../../styledComponents';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

const UserIcon = memo(() => {
  return (
    <>
      <FontAwesomeIcon 
        icon={faUser}
        style={UserIconStyle}
      />
    </>
  );
});

export default UserIcon;