import React, { memo } from 'react';
import { DropItem } from '../../../styledComponents';

/** 상위 컴포넌트 === DropDown.jsx
 *  도안 업로드 페이지 / 장르 드롭다운 아이템
 *  @param {String} text 장르 텍스트
 *  @param {Function} onClick 클릭 시 드롭다운 닫고 해당 아이템 보여줌
 */

const DropDownItem = memo(({ text, onClick }) => {
  return (
    <>
      <DropItem
        onMouseEnter={(e) => {
          e.target.style.backgroundColor = '#BFBCD3'
        }}
        onMouseLeave={(e) => {
          e.target.style.backgroundColor = '#e9e9e9'
        }}
        onClick={onClick}
      >
        {text}
      </DropItem>
    </>
  );
});

export default DropDownItem;