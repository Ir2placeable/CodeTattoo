import React from 'react';
import { 
  DraftImgBox, DraftImgInfo, DraftHeartBox,
  DraftDrawerDiv, DraftDrawerImg, DraftDrawer,
  DraftImgDiv,
  DraftImgHoverDiv, DraftDrawerImgDiv
} from '../../../styledComponents';

import DraftTitle from '../../atomic/draft/DraftTitle';
import DraftImage from '../../atomic/draft/DraftImage';
import DraftLikes from '../../atomic/draft/DraftLikes';
import HeartIcon from '../../atomic/draft/HeartIcon';
import UserIcon from '../../atomic/common/UserIcon';
import { useState } from 'react';



const Draft = ({ draft_id, image, title, like, drawer_id,
  drawer_image, drawer_nickname, isScraped }) => {
  const [hover, setHover] = useState(false);

  const onHover = (e) => {
    setHover(hover? false : true);
  } 

  const goDetail = () => {
    console.log('click');
  }
  const goTattooist = () => {
    console.log('go tattooist')
  }

  return (
    <>
      <DraftImgBox>

        <DraftDrawerDiv onClick={goTattooist}>
          <DraftDrawerImgDiv>
            {drawer_image ? (
              <DraftDrawerImg src={drawer_image} />
            ) : (
              <UserIcon />
            )}
          </DraftDrawerImgDiv>
      
          <DraftDrawer>{drawer_nickname}</DraftDrawer>
        </DraftDrawerDiv>

        <DraftImgDiv onClick={goDetail}>
          <DraftImage src={image} alt={title} id={draft_id}
            onHover={onHover} />

          { hover && (
            <DraftImgHoverDiv onMouseLeave={onHover}>
              {like} likes
            </DraftImgHoverDiv>
          )}
        </DraftImgDiv>

        <DraftImgInfo>

          <DraftTitle title={title} />

          <DraftHeartBox>
            <HeartIcon isScraped={isScraped} draft_id={draft_id} />
          </DraftHeartBox>

          {/* <DraftLikes like={like} /> */}

        </DraftImgInfo>

      </DraftImgBox>
    </>
  );
};

export default React.memo(Draft);