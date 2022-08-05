import React, { useState, useEffect } from 'react';
import useDraftList from '../../hooks/useDraftList';
import { 
  ListDiv, EmptyBox, DraftMainBox,
  DraftImgBox, DraftImg, DraftImgInfo, 
  DraftHeartBox, DraftImgTitle, DraftHeartCount
} from '../../styledComponents';
import Draft from '../organisms/draft/Draft';
import { useOutletContext } from 'react-router-dom';

//- drafts = { draft_id, image, title, like, drawer_id, 
//       drawer_image, drawer_nickname, isScraped }
const DraftList = ({ filter }) => {

  const { page } = useOutletContext();
  
  const drafts = useDraftList({
    filter: filter,
    page: page
  })

  // useEffect(() => {
  //   //sendRequest();
  //   console.log(page, filter);
  //   console.log('drafts list: ',drafts);
  // }, [drafts]);

  return (
    <>
      <ListDiv>

        {drafts.length === 0 ? (
          <EmptyBox>
            아직 도안이 없습니다. 
          </EmptyBox>
        ) : (
          <DraftMainBox >

            {drafts.map(draft => (
              <Draft key={draft.draft_id}
                draft_id={draft.draft_id}
                image={draft.image}
                title={draft.title}
                like={draft.like}
                drawer_id={draft.drawer_id}
                drawer_image={draft.drawer_image}
                drawer_nickname={draft.drawer_nickname}
                isScraped={draft.isScraped}
              />
            ))}

          </DraftMainBox>
        )}

      </ListDiv>
    </>
  );
};

export default DraftList;