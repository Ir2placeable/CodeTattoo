import React from 'react';

import { 
  DraftMainDiv,
  CategoryTitle,
  DraftMainBox,
  DraftImgBox,
  DraftImg,
  DraftImgInfo,
  DraftTattooistDiv,
  DraftImgTitle, 
  EmptyDraftBox,
} from '../styledComponents';
import UploadDraftBtn from './UploadDraftBtn';


const ShowDraftList = ({ text, drafts }) => {
  return (
    <>
      <DraftMainDiv>

        { text === "Tattooist drafts" ? (
          <UploadDraftBtn />
        ) : (
          <div></div>
        )}

        <CategoryTitle>
          {text}
        </CategoryTitle>

        {drafts ? (
          <EmptyDraftBox>
            아직 도안이 없습니다.
          </EmptyDraftBox>
        ) : (
          <DraftMainBox>
            {drafts.map(draft => (
              <DraftImgBox key={draft._id}>
                <DraftImg
                  width={`${draft.image.width}px`}
                  height={`${draft.image.height}px`}
                  src={draft.image.url}
                  alt={draft.title}
                />

                <DraftImgInfo>
                  <DraftTattooistDiv></DraftTattooistDiv>
                  <DraftImgTitle>{draft.title}</DraftImgTitle>
                </DraftImgInfo>
              </DraftImgBox>
            ))}
          </DraftMainBox>
        )}
        
      </DraftMainDiv>
    </>
  );
};

export default ShowDraftList;