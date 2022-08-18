import React, { memo } from 'react';
import { 
  DraftEditPopupDiv, DraftEditPopup, 
  DraftPopupText,
  DraftPopupBtn
} from '../../../styledComponents';

const Popup = memo(({ data, setIsOpen }) => {
  return (
    <>
      <DraftEditPopupDiv>
        <DraftEditPopup>

          <DraftPopupText>
            정말로 이 도안을 {data.text}하시겠습니까?
          </DraftPopupText>

          <DraftPopupBtn onClick={() => { setIsOpen(false) }}>
            취소
          </DraftPopupBtn>
          <DraftPopupBtn color='red' 
            onClick={() => { data.onRequest() }}>
            확인
          </DraftPopupBtn>

        </DraftEditPopup>
      </DraftEditPopupDiv>
    </>
  );
});

export default Popup;