import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { APIURL } from '../../config/key';

import { 
  DraftListDiv, EmptyDraftBox, DraftMainBox,
  DraftImgBox, DraftImg, DraftImgInfo, 
  DraftHeartBox, DraftImgTitle, DraftHeartCount
} from '../../styledComponents';

import HeartIcon from '../common/HeartIcon';
import { useParams } from 'react-router-dom';

const SearchDraft = ({ cookies }) => {
  const params = useParams();
  const title = params.title;

  const [drafts, setDrafts] = useState([]);
  const [noDraft, setNoDraft] = useState(true);

  const sendRequest = async() => {
    const res = await axios.get(
      `${APIURL}/draft/search/?user_id=${cookies.user_id}&title=${title}`)

    if(res.data.success){
      setDrafts(res.data.draft_list);
    } else {
      // 검색 결과 없음
      setNoDraft(true);
    }
  }

  useEffect(() => {
    // sendRequest();
  }, []);

  return (
    <>
      <DraftListDiv>

        {noDraft ? (
          <EmptyDraftBox>
            검색 결과가 없습니다. 
          </EmptyDraftBox>
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
        
      </DraftListDiv>
    </>
  );
};

export default SearchDraft;