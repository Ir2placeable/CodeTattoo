import React, { useState } from "react";
import {
  ImgInfoDiv,
  LoadedImgDescDiv,
  LoadedImgTitle,
} from "../../styledComponents";
import ImgChoice from "../atomic/draft_upload/ImgChoice";
import ImgLoaded from "../atomic/draft_upload/ImgLoaded";
import ImgUploadBtn from "../atomic/draft_upload/ImgUploadBtn";
import DropDown from "../organisms/upload/DropDown";
import ImgText from "../atomic/draft_upload/ImgText";
import DropTags from "../organisms/upload/DropTags";
import axios from "axios";
import { APIURL } from "../../config/key";
import { getCookie } from "../../config/cookie";


/**
 * 상위 컴포넌트 === ShowDraftUpload.jsx
 * 도안 업로드 템플릿 
 */

const DraftUpload = () => {
  //const sendRequest = useDraftUpload();
  const [src, setSrc] = useState(null);
  // const [info, setInfo] = useState({
  //   title: '',
  //   description: ''
  // })
  //const [title, setTitle] = useState("");
  const [info, setInfo] = useState({
    title: "",
    cost: ""
  })
  const [image, setImage] = useState({
    //width: 300,
    //height: 300,
    data: "",
    mime: "",
  });
  const [genre, setGenre] = useState("");
  const [keywords, setKewords] = useState([]);
  const { title, cost } = info;

  //const {title, description} = info;

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
  };

  const onLoad = () => {
    const parsing = src.split(",");
    let _mime = parsing[0].split(";")[0];
    _mime = _mime.substr(5);
    let _data = parsing[1];

    setImage({
      ...image,
      data: _data,
      mime: _mime,
    });
  };

  const sendRequest = async () => {
    const _cost = Number(cost);
    console.log(_cost, typeof _cost)
    
    if(!_cost){
      alert('가격 정보는 숫자만 입력해주세요!')
      return;
    }

    const res = await axios.post(
      `${APIURL}/create/draft/${getCookie("tattooist_id")}`,
      {
        image: image.data,
        mime: image.mime,
        title: title,
        cost: _cost,
        genre: genre,
        keywords: keywords,
      }
    );

    if (res.data.success) {
      console.log("도안 등록 성공");
      window.location.replace("/#/drafts/best");
    } else {
      console.log("도안 등록 실패");
    }
  };

  const onSubmit = () => {
    if (!src || !title || !genre || !cost) {
      alert("모든 정보를 입력해주세요!");
    } else {
      sendRequest();
    }
  };

  const onChange = (e) => {
    const { name, value } = e.target;
    setInfo({
      ...info,
      [name]: value
    })
    //setTitle(e.target.value);
  };

  return (
    <>
      <ImgChoice onSelectFile={onSelectFile} />

      <ImgInfoDiv>
        <ImgLoaded src={src} onLoad={onLoad} />

        {/* <UploadDesc title={title} description={description}
          onChange={onChange} /> */}

        <LoadedImgDescDiv>
          <ImgText text="도안 이름" />
          <LoadedImgTitle
            type="text"
            placeholder="title (12자 이내)"
            name="title"
            maxLength={"12"}
            value={title}
            onChange={onChange}
          />
          <ImgText text="도안 가격" />
          <LoadedImgTitle
            type="text"
            placeholder="숫자만 입력해주세요. (단위: 원)"
            name="cost"
            value={cost}
            onChange={onChange}
          />

          <div style={{ display: "flex" }}>
            <DropDown input={genre} setInput={setGenre} />
            <DropTags tags={keywords} setTags={setKewords} />
          </div>
        </LoadedImgDescDiv>
      </ImgInfoDiv>

      <ImgUploadBtn onSubmit={onSubmit} />
    </>
  );
};

export default React.memo(DraftUpload);
