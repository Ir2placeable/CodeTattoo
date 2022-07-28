import React from 'react';
import { 
  DraftImgBox, DraftImgInfo, DraftHeartBox,
} from '../../../styledComponents';

import DraftTitle from '../../atomic/draft/DraftTitle';
import DraftImage from '../../atomic/draft/DraftImage';
import DraftLikes from '../../atomic/draft/DraftLikes';
import HeartIcon from '../../atomic/draft/HeartIcon';

const Draft = ({ draft_id, image, title, like, drawer_id,
  drawer_image, drawer_nickname, isScraped }) => {
  return (
    <>
      <DraftImgBox>

        <DraftImage src={image} alt={title} id={draft_id} />

        <DraftImgInfo>

          <DraftHeartBox>
            <HeartIcon isScraped={isScraped} draft_id={draft_id} />
          </DraftHeartBox>

          <DraftTitle title={title} />

          <DraftLikes like={like} />

        </DraftImgInfo>

      </DraftImgBox>
    </>
  );
};

export default React.memo(Draft);