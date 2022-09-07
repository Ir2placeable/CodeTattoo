import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import useEditProcedureInfo from '../../../hooks/useEditProcedureInfo';
import { 
  ProcedureEditBox, ProcedureEditContents, 
  ProcedureEditDiv, ProcedureEditFooter, ProcedureEditFooterBtn, ProcedureEditHeader, ProcedureEditInput, ProcedureEditInputDiv, ProcedureEditLabel, ProcedureEditWrap 
} from '../../../styledComponents';

const EditProcedureInfo = ({ setInfoEdit, date, 
  time_slot, cost, body_part, onChange }) => {
  const sendRequest = useEditProcedureInfo();
  // const [inputs, setInputs] = useState({
  //   date: String(_date),
  //   time_slot: String(_time_slot),
  //   cost: String(_cost),
  //   body_part: _body_part
  // })
  // const { date, time_slot, cost, body_part } = inputs;

  // const onChange = (e) => {
  //   const { name, value } = e.target;

  //   setInputs({
  //     ...inputs,
  //     [name]: value
  //   })

  //   // console.log(inputs)
  // }

  const onClick = () => {
    const d = Number(date)
    const t = Number(time_slot)
    const c = Number(cost)

    // console.log(d, t, c)

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

      // setTimeout(() => {
      //   window.location.replace('');
      // }, 500)
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

          <ProcedureEditFooter>
            <ProcedureEditFooterBtn onClick={() => setInfoEdit(false)}>
              취소
            </ProcedureEditFooterBtn>
            <ProcedureEditFooterBtn onClick={onClick}>
              수정
            </ProcedureEditFooterBtn>
          </ProcedureEditFooter>

        </ProcedureEditBox>

      </ProcedureEditDiv> 
    </>
  );
};

export default EditProcedureInfo;