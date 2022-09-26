import React from 'react';
import { ProcedureEditFooter, ProcedureEditFooterBtn } from '../../../styledComponents';

/** 상위컴포넌트 === EditProcedureImg.jsx || EditProcedureInfo.jsx
 * 예약 정보 수정 버튼
 * @param {Function} setEdit 정보 수정 팝업 보여짐 여부 상태 함수
 * @param {Function} onEdit 정보 수정 api 함수
 */
const EditProcedureBtns = ({setEdit, onEdit}) => {
  return (
    <>
      <ProcedureEditFooter>

        <ProcedureEditFooterBtn onClick={() => setEdit(false)}>
          취소
        </ProcedureEditFooterBtn>

        <ProcedureEditFooterBtn onClick={onEdit}>
          수정
        </ProcedureEditFooterBtn>
      
      </ProcedureEditFooter> 
    </>
  );
};

export default EditProcedureBtns;