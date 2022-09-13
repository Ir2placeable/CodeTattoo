import React from 'react';
import { useState } from 'react';
import { useRef } from 'react';
import useEditProcedureImg from '../../../hooks/useEditProcedureImg';
import { 
  ProcedureEditDiv, 
  ProcedureEditBox,
  ProcedureEditHeader,
  ProcedureEditFooter,
  ProcedureEditFooterBtn,
  ProcedureEditContents,
  ProcedureEditImg,
  ProcedureEditFile
} from '../../../styledComponents';
import EditProcedureBtns from './EditProcedureBtns';

const EditProcedureImg = ({ setImgEdit, _src, data, setData }) => {
  const sendRequest = useEditProcedureImg();
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

  const onSelectFile = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader();

      // base64 형식으로 읽어오기
      reader.readAsDataURL(e.target.files[0]);

      reader.addEventListener("load", () => {
        setSrc(reader.result);
      });
    }
  }

  const onEdit = () => {
    sendRequest({image, mime});
    setImgEdit(false);

    setTimeout(() => {
      window.location.reload();
    }, 500)
    
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