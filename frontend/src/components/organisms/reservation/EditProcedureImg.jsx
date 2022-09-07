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

const EditProcedureImg = ({ setImgEdit, _src }) => {
  const sendRequest = useEditProcedureImg();
  const [src, setSrc] = useState(_src);
  const imgInput = useRef();
  const [data, setData] = useState({
    image: '',
    mime: ''
  })

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
        //console.log('reader: ', reader);
        setSrc(reader.result);
      });
    }
  }

  const onEdit = () => {
    sendRequest({image, mime});
    setImgEdit(false);

    setTimeout(() => {
      window.location.replace('');
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


          <ProcedureEditFooter>
            <ProcedureEditFooterBtn onClick={() => setImgEdit(false)}>
              취소
            </ProcedureEditFooterBtn>
            <ProcedureEditFooterBtn onClick={onEdit}>
              수정
            </ProcedureEditFooterBtn>
          </ProcedureEditFooter>

        </ProcedureEditBox>

      </ProcedureEditDiv>
    </>
  );
};

export default EditProcedureImg;