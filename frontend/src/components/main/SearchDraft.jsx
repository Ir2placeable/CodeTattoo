import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { APIURL } from '../../config/key';

import { 
  ListDiv, EmptyBox, DraftMainBox,
  DraftImgBox, DraftImg, DraftImgInfo, 
  DraftHeartBox, DraftImgTitle, DraftHeartCount,
  SearchResText
} from '../../styledComponents';

import HeartIcon from '../common/HeartIcon';
import { useParams } from 'react-router-dom';

// - GET : http://3.39.196.91:3001/main/draft/:filter
//     - filter = search / page 없음
// - query : { user_id, **title(도안 타이틀)** }
// - return : { success, [draft_list] }
//     - draft_list = { draft_id, image, title, like, isScraped }
//         - scraped는 유저가 스크랩 미리 스크랩 했는지 여부를 알려줌(true / false)
//     - err 1 : 검색 결과 없음
const SearchDraft = ({ cookies }) => {
  const params = useParams();
  const title = params.title;

  const [drafts, setDrafts] = useState([]);
  const [noDraft, setNoDraft] = useState(true);

  const sendRequest = async() => {
    const res = await axios.get(
      `${APIURL}/main/draft/search/0/?user_id=${cookies.user_id}&title=${title}`)

    if(res.data.success){
      console.log(res.data);
      setDrafts(res.data.draft_list);
    }
  }

  useEffect(() => {
    sendRequest();
  }, []);

  return (
    <>
      <ListDiv>

        <SearchResText>
          <span style={{
            fontWeight: 'bold',
            color: 'black'
          }}>'{title}'</span> 에 대한 검색 결과 입니다.
        </SearchResText>

        {drafts.length === 0 ? (
          <EmptyBox>
            검색 결과가 없습니다. 
          </EmptyBox>
        ) : (
          <DraftMainBox>
            {drafts.map(draft => (
              <DraftImgBox key={draft.draft_id}>

              <DraftImg 
                src={draft.image}
                alt={draft.title}
                id={draft.draft_id}
              />

              <DraftImgInfo>
                <DraftHeartBox>
                  <HeartIcon size={35} />
                  <DraftHeartCount>
                    {draft.like}
                  </DraftHeartCount>
                </DraftHeartBox>
                <DraftImgTitle>{draft.title}</DraftImgTitle>
              </DraftImgInfo>

            </DraftImgBox>
            ))}
          </DraftMainBox>
        )}
        
      </ListDiv>
    </>
  );
};

export default SearchDraft;