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



const ShowDraftList = ({ text, drafts, tattooist }) => {
  //console.log('drafts: ',drafts)
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
                <ImgHeartBox style={tattooist ? {display: 'none'} : {}}>
                  <HeartIcon size={28} />
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