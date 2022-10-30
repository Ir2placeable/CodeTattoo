import React from 'react';
import { useState } from 'react';
import { useRef } from 'react';
import useEditProcedureImg from '../../../hooks/useEditProcedureImg';
import { 
  ProcedureEditDiv, 
  ProcedureEditBox,
  ProcedureEditHeader,
  ProcedureEditContents,
  ProcedureEditImg,
  ProcedureEditFile
} from '../../../styledComponents';
import EditProcedureBtns from './EditProcedureBtns';

/** 상위 컴포넌트 === Procedure.jsx
 * 예약 도안 이미지 수정 컴포넌트 
 * @param {Function} setImgEdit 도안 수정 팝업 보여짐 여부 상태 함수
 * @param {String} _src 기존 이미지 소스
 * @param {Object} data 선택된 도안 base64 형식 데이터 상태
 * @param {Function} setData data 상태 함수
 */
const EditProcedureImg = ({ 
  setImgEdit, _src, data, setData, 
}) => {
  // 예약 도안 이미지 수정 api
  const sendRequest = useEditProcedureImg();
  // 선택된 이미지 소스 상태
  const [src, setSrc] = useState(_src);
  const imgInput = useRef();
  const { image, mime } = data;

  const onClick = () => {
    imgInput.current.click();
  }

  const onLoad = () => {
    const parsing = src.split(",");
    let _mime = parsing[0].split(';')[0];
    _mime = _mime.substr(5);
    let _image = parsing[1];

    setData({
      ...data,
      image: _image,
      mime: _mime
    })
  }

  // 이미지 파일 선택
  const onSelectFile = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const maxSize = 10 * 1024 * 1024;
      const fileSize = e.target.files[0].size;
      if (maxSize < fileSize) {
        alert("첨부 이미지 사이즈는 10MB를 초과할 수 없습니다");
        return false;
      } else {
        const reader = new FileReader();

        // base64 형식으로 읽어오기
        reader.readAsDataURL(e.target.files[0]);

        reader.addEventListener("load", () => {
          setSrc(reader.result);
        });
      }
    }
  };

  const onEdit = () => {
    sendRequest({image, mime});
    setImgEdit(false);
    sendRequest({image, mime})
      .then(() => {
        window.location.reload()
      })
    
  }

  return (
    <>
      <ProcedureEditDiv>

        <ProcedureEditBox>

          <ProcedureEditHeader>
            예약 이미지 수정
          </ProcedureEditHeader>

          <ProcedureEditContents>

            <ProcedureEditImg src={src} onLoad={onLoad} />

            <input 
              type="file" style={{display: 'none'}} 
              ref={imgInput}
              onChange={onSelectFile} />
            <ProcedureEditFile onClick={onClick}>
              이미지 업로드
            </ProcedureEditFile>

          </ProcedureEditContents>

          <EditProcedureBtns setEdit={setImgEdit} onEdit={onEdit} />

        </ProcedureEditBox>

      </ProcedureEditDiv>
    </>
  );
};

export default EditProcedureImg;