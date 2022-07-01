import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { APIURL } from '../../config/key';

import { 
  DraftListDiv, EmptyDraftBox, DraftMainBox,
  DraftImgBox, DraftImg, DraftImgInfo, 
  DraftHeartBox, DraftImgTitle, DraftHeartCount
} from '../../styledComponents';

import HeartIcon from '../common/HeartIcon';

const tempDrafts = [
  {
    draft_id: 'a1',
    image: 'img/ex.PNG',
    title: '이미지',
    like: '10',
    isScraped: false
  },
  {
    draft_id: 'a2',
    image: 'img/ex.PNG',
    title: '이미지',
    like: '123',
    isScraped: false
  },
  {
    draft_id: 'a3',
    image: 'img/ex.PNG',
    title: '이미지1',
    like: '1.3 K',
    isScraped: false
  },
  {
    draft_id: 'a4',
    image: 'img/ex.PNG',
    title: '이미지1',
    like: '6.2 K',
    isScraped: false
  },
  {
    draft_id: 'a5',
    image: 'img/ex.PNG',
    title: '이미지1',
    like: '10.1 K',
    isScraped: false
  }
]

const DraftList = ({ filter, cookies }) => {
  // draft_list = { draft_id, image, title, like, isScraped }
  const [drafts, setDrafts] = useState([]);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState([]);

  const sendRequest = async() => {
    const res = await axios.get(`${APIURL}/main/draft/${filter}/${page}/?user_id=${cookies.user_id}`)

    if(res.data.success){
      setDrafts(res.data.draft_list)
    } else {
      console.log('Draft List Get Request Fail');
    }
  }

  useEffect(() => {
    //sendRequest();
  }, [])

  const goDetail = (e) => {
    const draft_id = e.target.id;
    console.log('click', draft_id)
  }

  return (
    <>
      <DraftListDiv>

        {tempDrafts.length === 0 ? (
          <EmptyDraftBox>
            아직 도안이 없습니다. 
          </EmptyDraftBox>
        ) : (
          <DraftMainBox>
            
            {tempDrafts.map(draft => (
              <DraftImgBox key={draft.draft_id}>

                <DraftImg 
                  src="../../img/react.jpg"
                  alt={draft.title}
                  id={draft.draft_id}
                  onClick={goDetail}
                />

                <DraftImgInfo>
                  <DraftHeartBox>
                    <HeartIcon size={35} />
                  </DraftHeartBox>
                  <DraftImgTitle>{draft.title}</DraftImgTitle>
                  <DraftHeartCount>
                      {draft.like} likes
                  </DraftHeartCount>
                </DraftImgInfo>

              </DraftImgBox>
            ))}

          </DraftMainBox>
        )}
      </DraftListDiv>
    </>
  );
};

export default DraftList;