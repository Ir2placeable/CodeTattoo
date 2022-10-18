import React, { memo, useState } from 'react';
import { 
  ChattingMyTattooImg, ChattingMyTattooImgDiv 
} from '../../../styledComponents';

const MyTattooItem = ({ tattoo_id, image, onClick }) => {
  const [style, setStyle] = useState('none');

  const onChoice = (e) => {
    const res = onClick(e, tattoo_id)

    if(res){
      setStyle('click')
    } else {
      setStyle('none')
    }
  }

  return (
    <>
      <ChattingMyTattooImgDiv onClick={onChoice}>
        <ChattingMyTattooImg type={style} src={image} />
      </ChattingMyTattooImgDiv>
    </>
  );
};

export default MyTattooItem;