import React from 'react';

import { 
  DraftMainDiv,
  CategoryTitle,
  DraftMainBox,
  ImgBox,
  DraftImg,
  DraftImgInfo,
  TattooistImg,
  DraftImgTitle, 
  EmptyDraftBox,
  ImgHeartBox,
  TattooistSmallImg
} from '../styledComponents';

import HeartIcon from './HeartIcon';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan, faUser } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const ShowDraftList = ({ cookies, text, drafts, tattooist, setCookie, removeCookie }) => {
  //console.log('drafts: ',drafts)
  const deleteDraft = () => {
    // 타투이스트 본인 도안 목록에서 지우기 
    // 쿠키 props로 받아오기 
  }

  const navigate = useNavigate();
  const goTattooistMyPage = (e) => {
    const tattooist_id = e.target.id;
    console.log(tattooist_id);
    navigate(`/tattooist/mypage/${tattooist_id}`)
  }

  return (
    <>
      <DraftMainDiv>

        {
          text ? (
            <CategoryTitle>
              {text}
            </CategoryTitle>
          ) : (
            <div></div>
          )
        }

        {drafts.length === 0 ? (
          <EmptyDraftBox>
            아직 도안이 없습니다.
          </EmptyDraftBox>
        ) : (
          <DraftMainBox>
            {drafts.map(draft => (
              <ImgBox key={draft._id}>
                <ImgHeartBox>
                  {tattooist ? (
                    <FontAwesomeIcon 
                      style={{fontSize: '28px', cursor: 'pointer'}} 
                      icon={faTrashCan}
                      onClick={deleteDraft} />
                  ) : (
                    <HeartIcon user_id={cookies.user_id} draft_id={draft._id} size={28} cookies={cookies} />
                  )}
                </ImgHeartBox>
                <DraftImg
                  width={`300px`}
                  height={`300px`}
                  src={draft.image}
                  alt={draft.title}
                />

                <DraftImgInfo>
                  <TattooistImg id={draft.tattooist_id} onClick={goTattooistMyPage}>
                    {draft.tattooist_image ? (
                      <TattooistSmallImg 
                        src={draft.tattooist_image}
                        alt="타투이스트 마이페이지로 이동"
                        id={draft.tattooist_id}
                      />
                    ) : (
                      <FontAwesomeIcon style={{fontSize: '28px'}} icon={faUser}/>
                    )}
                  </TattooistImg>
                  <DraftImgTitle>{draft.tattooist_nickname} - {draft.title}</DraftImgTitle>
                </DraftImgInfo>
              </ImgBox>
            ))}
          </DraftMainBox>
        )}
        
      </DraftMainDiv>
    </>
  );
};

export default ShowDraftList;