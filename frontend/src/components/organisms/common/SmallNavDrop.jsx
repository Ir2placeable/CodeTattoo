import React, { memo, useState } from 'react';
import { 
  SmallNavDropDown, SmallNavDropItem, SmallNavDropMenu 
} from '../../../styledComponents';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSliders } from '@fortawesome/free-solid-svg-icons';
import { goDraftList, goDraftScalp, goDraftEyebrow } from '../../../config/navigate';

const SmallNavDrop = memo(() => {
  const [isOpen, setIsOpen] = useState(false);

  const onClick = (e) => {
    if(e.target === e.currentTarget){
      setIsOpen(isOpen ? false : true);
    }
  }

  const onChoose = (e) => {
    const text = e.target.innerText;

    setIsOpen(false)
    if(text === '전체'){
      goDraftList();
    } else if(text === '두피'){
      goDraftScalp();
    } else if(text === '눈썹'){
      goDraftEyebrow();
    }
  }

  return (
    <>
      <SmallNavDropDown onClick={onClick}>
        필터
        <FontAwesomeIcon icon={faSliders} style={{marginLeft: '10px'}} />

        {isOpen && (
          <SmallNavDropMenu>
            <SmallNavDropItem onClick={onChoose}>
              전체
            </SmallNavDropItem>
            <SmallNavDropItem onClick={onChoose}>
              두피
            </SmallNavDropItem>
            <SmallNavDropItem onClick={onChoose}>
              눈썹
            </SmallNavDropItem>
          </SmallNavDropMenu>
        )}
      </SmallNavDropDown>
    </>
  );
});

export default SmallNavDrop;