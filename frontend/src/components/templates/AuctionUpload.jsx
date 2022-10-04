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
import axios from "axios";
import { APIURL } from "../../config/key";
import { getCookie } from "../../config/cookie";
import { goAuctionList } from "../../config/navigate";
import { auction } from "../../data";


const AuctionUpload = () => {  // 이미지 (base64 형식)
    
    const [src, setSrc] = useState(null);
    // 도안 정보
    const [cost, setCost] = useState("");
    const [image, setImage] = useState({
      data: "",
      mime: "",
    });
    // 장르 데이터
    const [genre, setGenre] = useState("");

  
    // 이미지 파일 선택
    const onSelectFile = (e) => {
      if (e.target.files && e.target.files.length > 0) {
        const reader = new FileReader();
  
        // base64 형식으로 읽어오기
        reader.readAsDataURL(e.target.files[0]);
  
        reader.addEventListener("load", () => {
          setSrc(reader.result);
        });
      }
    };
  
    // 이미지 파싱
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
  
    // 경매 등록 요청 API
    const sendRequest = async () => {
      const _cost = Number(cost);
      
      if(!_cost){
        alert('가격 정보는 숫자만 입력해주세요!')
        return;
      }
      
      const res = await axios.post(
        `${APIURL}/create/auction/${getCookie("user_id")}`,
        {
          image: image.data,
          mime: image.mime,
          cost: _cost,
          genre: genre,
        }
      );
  
      if (res.data.success) {
        goAuctionList();
      } else {
        console.log("도안 등록 실패");
      }
    };
  
    const onSubmit = () => {
      if (!src || !genre || !cost) {
        alert("모든 정보를 입력해주세요!");
      } else {
        sendRequest();
      }
    };
  
    const onChange = (e) => {
      setCost(e.target.value);
    };
  
    return (
      <>
        <ImgChoice onSelectFile={onSelectFile} />
  
        <ImgInfoDiv>
          <ImgLoaded src={src} onLoad={onLoad} />
  
          <LoadedImgDescDiv>
            <ImgText text="희망 가격" />
            <LoadedImgTitle
              type="text"
              placeholder="숫자만 입력해주세요. (단위: 원)"
              name="cost"
              value={cost}
              onChange={onChange}
            />
  
            <div style={{ display: "flex" }}>
              <DropDown input={genre} setInput={setGenre} items={auction}/>
            </div>
          </LoadedImgDescDiv>
        </ImgInfoDiv>
  
        <ImgUploadBtn onSubmit={onSubmit} text="경매 등록" />
      </>
    );}

export default AuctionUpload;