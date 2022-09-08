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
  const [cost, setCost] =  useState(detail.cost);

  const onDelete = () => {
    deleteDraft();
    window.location.replace('/drafts/best')
  }
  const onEdit = () => {
    const _cost = Number(cost);

    if(!_cost){
      alert('가격 정보는 숫자만 입력해주세요!')
      return;
    }

    editDraft({
      title, genre, keywords, cost: _cost
    })
    window.location.replace('/drafts/best')
  }
  const onClick = (e) => {
    const text = e.target.innerText;
    console.log(text)

    if(text === '도안 삭제'){
      setData({
        text: '정말로 이 도안을 삭제하시겠습니까?',
        onRequest: onDelete,
      })
    } else {
      setData({
        text: '정말로 이 도안을 수정하시겠습니까?',
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
            placeholder='title'
            name="title"
            value={title}
            onChange={(e) => {setTitle(e.target.value)}}
          />
          <ImgText text="도안 이름" />
          <LoadedImgTitle 
            type="text"
            placeholder="숫자만 입력해주세요. (단위: 원)"
            name="cost"
            value={cost}
            onChange={(e) => {setCost(e.target.value)}}
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