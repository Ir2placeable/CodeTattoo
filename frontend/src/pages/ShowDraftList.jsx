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
} from '../styledComponents';

import HeartIcon from './HeartIcon';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';


const ShowDraftList = ({ text, drafts, tattooist }) => {
  //console.log('drafts: ',drafts)
  const deleteDraft = () => {
    // 타투이스트 본인 도안 목록에서 지우기 
    // 쿠키 props로 받아오기 
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
                    <HeartIcon size={28} />
                  )}
                </ImgHeartBox>
                <DraftImg
                  width={`${draft.image.width}px`}
                  height={`${draft.image.height}px`}
                  src={draft.image.url}
                  alt={draft.title}
                />

                <DraftImgInfo>
                  <TattooistImg></TattooistImg>
                  <DraftImgTitle>{draft.title}</DraftImgTitle>
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