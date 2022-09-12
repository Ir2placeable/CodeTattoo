import React from 'react';
import { ProcedureEditFooter, ProcedureEditFooterBtn } from '../../../styledComponents';

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