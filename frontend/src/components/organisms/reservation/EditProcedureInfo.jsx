import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import useEditProcedureInfo from '../../../hooks/useEditProcedureInfo';
import { 
  ProcedureEditBox, ProcedureEditContents, 
  ProcedureEditDiv, ProcedureEditFooter, ProcedureEditFooterBtn, ProcedureEditHeader, ProcedureEditInput, ProcedureEditInputDiv, ProcedureEditLabel, ProcedureEditWrap 
} from '../../../styledComponents';
import EditProcedureBtns from './EditProcedureBtns';

/** 상위 컴포넌트 === Procedure.jsx
 * 예약 도안 이미지 수정 컴포넌트 
 * @param {Function} setInfoEdit 정보 수정 팝어 보여짐 여부 상태 함수
 * @param {String} date 날짜
 * @param {String} time_sot 시간
 * @param {String} cost 가격
 * @param {String} body_part 시술 부위
 * @param {Function} onChange date, time_slot, cost, body_part 상태 변화 감지 함수
 */
const EditProcedureInfo = ({ setInfoEdit, date, 
  time_slot, cost, body_part, onChange }) => {
  const sendRequest = useEditProcedureInfo();

  const onClick = () => {
    const d = Number(date)
    const t = Number(time_slot)
    const c = Number(cost)

    if(!d || !t || !c) {
      alert('형식에 맞게 작성해주세요!')
      return;
    } else {
      sendRequest({
        date: d,
        time_slot: t,
        cost: c,
        body_part: body_part
      })

      setInfoEdit(false);

      setTimeout(() => {
        window.location.reload();
      }, 500)
    }
  }

  return (
    <>
      <ProcedureEditDiv>

        <ProcedureEditBox>

          <ProcedureEditHeader>
            예약 정보 수정
          </ProcedureEditHeader>

          <ProcedureEditContents>

            <ProcedureEditInputDiv>
              <ProcedureEditWrap>
                <ProcedureEditLabel>
                  날짜
                </ProcedureEditLabel>
                <ProcedureEditInput 
                  type="text"
                  name="date"
                  value={date}
                  onChange={onChange}
                  placeholder="YYMMDD"
                />
              </ProcedureEditWrap>

              <ProcedureEditWrap>
                <ProcedureEditLabel>
                  시간
                </ProcedureEditLabel>
                <ProcedureEditInput 
                  type="text"
                  name="time_slot"
                  value={time_slot}
                  onChange={onChange}
                  placeholder="TTMM (TT: 10~19, MM: 00 or 30)"
                />
              </ProcedureEditWrap>

              <ProcedureEditWrap>
                <ProcedureEditLabel>
                  비용
                </ProcedureEditLabel>
                <ProcedureEditInput 
                  type="text"
                  name="cost"
                  value={cost}
                  onChange={onChange}
                  placeholder="숫자만 입력가능합니다. (단위: 원)"
                />
              </ProcedureEditWrap>

              <ProcedureEditWrap>
                <ProcedureEditLabel>
                  시술 부위
                </ProcedureEditLabel>
                <ProcedureEditInput 
                  type="text"
                  name="body_part"
                  value={body_part}
                  onChange={onChange}
                />
              </ProcedureEditWrap>
            </ProcedureEditInputDiv>

          </ProcedureEditContents>

          <EditProcedureBtns setEdit={setInfoEdit} onEdit={onClick} />

        </ProcedureEditBox>

      </ProcedureEditDiv> 
    </>
  );
};

export default EditProcedureInfo;