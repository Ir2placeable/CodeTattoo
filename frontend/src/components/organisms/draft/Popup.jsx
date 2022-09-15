import React, { memo } from 'react';
import { 
  DraftEditPopupDiv, DraftEditPopup, 
  DraftPopupText,
  DraftPopupBtn
} from '../../../styledComponents';

/**
 * 도안 수정 / 도안 삭제 / 예약 취소 / 예약 확정에 쓰이는 팝업
 *  @param {Object} data { text: 팝업 문구, onRequest: 확이 눌렀을 때 호출할 api 함수 }
 *  @param {Function} setIsOpen 팝업 보여짐 여부 상태 함수
 */
const Popup = memo(({ data, setIsOpen }) => {
  return (
    <>
      <DraftEditPopupDiv>
        <DraftEditPopup>

          <DraftPopupText>
            {data.text}
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