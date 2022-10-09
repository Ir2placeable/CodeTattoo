import React, { memo, useEffect, useState } from 'react';
import { 
  SmallNavDropDown, SmallNavDropItem, SmallNavDropMenu 
} from '../../../styledComponents';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSliders } from '@fortawesome/free-solid-svg-icons';
import { goDraftList, goDraftScalp, goDraftEyebrow } from '../../../config/navigate';
import { useLocation } from 'react-router-dom';

const SmallNavDrop = memo(() => {
  const [isOpen, setIsOpen] = useState(false);
  const [filter, setFilter] = useState()
  const location = useLocation();

  useEffect(() => {
    const [ , , , tmp] = location.pathname.split('/')
    
    if(tmp == undefined){
      setFilter('전체')
    } else if(tmp === 'scalp'){
      setFilter('두피')
    } else if(tmp === 'eyebrow'){
      setFilter('눈썹')
    } else {
      setFilter('필터')
    }
  }, [location.pathname])

  const onClick = (e) => {
    if(e.target === e.currentTarget){
      setIsOpen(isOpen ? false : true);
    }
  }

  const onChoose = (e) => {
    const text = e.target.innerText;
    setFilter(text)

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
        {filter}
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