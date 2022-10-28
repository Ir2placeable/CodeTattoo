import React from 'react';
import { CircleXmarkStyle, MyTattooPopupBox, MyTattooPopupDiv, MyTattooPopupHeader } from '../../../styledComponents';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark } from '@fortawesome/free-regular-svg-icons';


const MyTattooPopup = () => {
  return (
    <>
      <MyTattooPopupDiv>

        <MyTattooPopupBox>
          <MyTattooPopupHeader>
            마이타투 이력

            <FontAwesomeIcon icon={faCircleXmark} 
              style={CircleXmarkStyle}/>
          </MyTattooPopupHeader>
        </MyTattooPopupBox>

      </MyTattooPopupDiv>
    </>
  );
};

export default MyTattooPopup;