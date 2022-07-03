import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { APIURL } from '../../config/key';

import { 
  ListDiv, EmptyBox, DraftMainBox,
  DraftImgBox, DraftImg, DraftImgInfo, 
  DraftHeartBox, DraftImgTitle, DraftHeartCount
} from '../../styledComponents';

import HeartIcon from '../common/HeartIcon';
import Pagination from '../common/Pagination';
import { useLocation } from 'react-router-dom';

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
    isScraped: true
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
    isScraped: true
  },
  {
    draft_id: 'a5',
    image: 'img/ex.PNG',
    title: '이미지1',
    like: '10.1 K',
    isScraped: false
  }
]

// 도안 - http://3.39.196.91:3001/main/draft/:filter/:page
//     - filter: init, best, all
// 스크랩 도안 - - GET : http://3.39.196.91:3001/main/scrap/:filter/:page
//    - filter : init / draft / tattooist
// 도안 관리 - - GET : http://3.39.196.91:3001/main/my-draft/:filter/:page
//    - filter : init / list

const DraftList = ({ path, cookies, filter }) => {
  // draft_list = { draft_id, image, title, like, isScraped }
  const [drafts, setDrafts] = useState([]);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState([]);

  const sendRequest = async() => {
    let _id = cookies.user_id;
    let _name = 'user'
    if(cookies.tattooist_id){
      _id = cookies.tattooist_id;
      _name = 'tattooist'
    }

    const res = await axios.get(`${APIURL}/${path}/${page}/?${_name}_id=${_id}`)

    if(res.data.success){
      console.log('Draft List Get Request Success')
      setDrafts(res.data.draft_list)
    } else {
      console.log(res.data)
      console.log('Draft List Get Request Fail');
    }
  }

  useEffect(() => {
    sendRequest();
  }, [])

  const goDetail = (e) => {
    const draft_id = e.target.id;
    console.log('click', draft_id)
  }

  return (
    <>
      <ListDiv>

        {drafts.length === 0 ? (
          <EmptyBox>
            아직 도안이 없습니다. 
          </EmptyBox>
        ) : (
          <DraftMainBox>
            
            {drafts.map(draft => (
              <DraftImgBox key={draft.draft_id}>

                <DraftImg 
                  src="../../img/react.jpg"
                  alt={draft.title}
                  id={draft.draft_id}
                  onClick={goDetail}
                />

                <DraftImgInfo>
                  <DraftHeartBox>
                    <HeartIcon size={35} 
                      cookies={cookies} draft_id={draft.draft_id}
                      isScraped={draft.isScraped} />
                  </DraftHeartBox>
                  <DraftImgTitle>{draft.title}</DraftImgTitle>
                  <DraftHeartCount>
                      {draft.like} likes
                  </DraftHeartCount>
                </DraftImgInfo>

              </DraftImgBox>
            ))}

          <Pagination
            filter={filter}
            cookies={cookies}
            page={page}
            setPage={setPage}
            pages={pages}
            setPages={setPages}
          />

          </DraftMainBox>
        )}

      </ListDiv>
    </>
  );
};

export default DraftList;