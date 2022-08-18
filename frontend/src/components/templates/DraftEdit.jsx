import React from 'react';
import { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import useDraftEdit from '../../hooks/useDraftEdit';
import { 
  DraftEditDiv, ImgInfoDiv, LoadedImgDescDiv, 
  LoadedImgTitle, UploadDiv, DraftEditBox,
  DraftEditPopupDiv, DraftEditPopup, 
  DraftPopupText,
  DraftPopupBtn
} from '../../styledComponents';
import ImgLoaded from '../atomic/draft_upload/ImgLoaded';
import ImgText from '../atomic/draft_upload/ImgText';
import Popup from '../organisms/draft/Popup';
import DropDown from '../organisms/upload/DropDown';
import DropTags from '../organisms/upload/DropTags';

const DraftEdit = () => {
  const { detail } = useOutletContext();

  const [deleteDraft, editDraft] = useDraftEdit({
    draft_id: detail.draft_id,
    tattooist_id: detail.drawer_id
  })

  const [isOpen, setIsOpen] = useState(false);
  const [data, setData] = useState({});

  const [title, setTitle] = useState(detail.title);
  const [genre, setGenre] = useState(detail.genre);
  const [keywords, setKewords] = useState(detail.keywords);

  const onDelete = () => {
    deleteDraft();
    window.location.replace('/drafts/best')
  }
  const onEdit = () => {
    editDraft({
      title, genre, keywords
    })
    window.location.replace('/drafts/best')
  }
  const onClick = (e) => {
    const text = e.target.innerText;
    console.log(text)

    if(text === '도안 삭제'){
      setData({
        text: '삭제',
        onRequest: onDelete,
      })
    } else {
      setData({
        text: '수정',
        onRequest: onEdit,
      })
    }
    setIsOpen(true);
  }
  
  return (
  <>
    <UploadDiv>

      <ImgInfoDiv>

        <ImgLoaded src={detail.image} />

        <LoadedImgDescDiv>
          <ImgText text="도안 이름" />
          <LoadedImgTitle 
            type="text"
            value={title}
            onChange={(e) => {setTitle(e.target.value)}}
          />

          <div style={{ display: "flex" }}>
            <DropDown input={genre} setInput={setGenre} />
            <DropTags tags={keywords} setTags={setKewords} />
          </div>
        </LoadedImgDescDiv>
      
      </ImgInfoDiv>

      <DraftEditDiv>
        <DraftEditBox color="red" onClick={onClick}>
          도안 삭제
        </DraftEditBox>
        <DraftEditBox color="black" onClick={onClick}>
          도안 수정
        </DraftEditBox>
      </DraftEditDiv>

      {isOpen && (
        <Popup data={data} setIsOpen={setIsOpen} />
      )}
      
    </UploadDiv>
  </>
  );
};

export default DraftEdit;