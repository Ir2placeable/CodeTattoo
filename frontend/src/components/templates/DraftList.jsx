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
  // const drafts = useDraftList({
  //   filter, page
  // });
  const drafts = [
    {
      draft_id: 1,
      image: '../../img/ex.jpg',
      title: 'express',
      like: 3,
      isScraped: true,
      drawer_id: 10,
      drawer_image: '../../img/ex.jpg',
      drawer_nickname: 'ahyoung',
    },
    {
      draft_id: 2,
      image: '../../img/react.jpg',
      title: 'react',
      like: 31,
      isScraped: false,
      drawer_id: 20,
      drawer_image: '../../img/react.jpg',
      drawer_nickname: 'minsoo',
    },
    {
      draft_id: 3,
      image: '../../img/react.jpg',
      title: 'react',
      like: 31,
      isScraped: false,
      drawer_id: 30,
      drawer_image: '../../img/react.jpg',
      drawer_nickname: 'minsoo',
    },
    {
      draft_id: 4,
      image: '../../img/react.jpg',
      title: 'react',
      like: 31,
      isScraped: false,
      drawer_id: 40,
      drawer_image: '../../img/react.jpg',
      drawer_nickname: 'minsoo',
    },
    {
      draft_id: 5,
      image: '../../img/react.jpg',
      title: 'react',
      like: 31,
      isScraped: true,
      drawer_id: 50,
      drawer_image: '../../img/react.jpg',
      drawer_nickname: 'minsoo',
    }
  ];

  const { page } = useOutletContext();
  const [temp, sendRequest] = useDraftList({
    filter: filter,
    page: page
  })

  useEffect(() => {
    sendRequest();
    console.log(page, filter);
  }, []);

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