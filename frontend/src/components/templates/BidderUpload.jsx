import React, { useState } from "react";
import {
  ImgInfoDiv,
  LoadedImgDescDiv,
  LoadedImgTitle,
} from "../../styledComponents";
import ImgChoice from "../atomic/draft_upload/ImgChoice";
import ImgLoaded from "../atomic/draft_upload/ImgLoaded";
import ImgUploadBtn from "../atomic/draft_upload/ImgUploadBtn";
import ImgText from "../atomic/draft_upload/ImgText";
import axios from "axios";
import { APIURL } from "../../config/key";
import { getCookie } from "../../config/cookie";
import { goAuctionDetail } from "../../config/navigate";
import { useParams } from "react-router-dom";

/**
 * 상위 컴포넌트 === ShowDraftUpload.jsx
 * 응찰 업로드 템플릿 
 */

const BidderUpload = () => {
    const param = useParams();
    const auction_id = param.id;

    const [src, setSrc] = useState(null);
    // 도안 정보
    const [cost, setCost] = useState("");
    const [image, setImage] = useState({
      data: "",
      mime: "",
    });
 
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
  
    // 응찰 등록 요청 API
    const sendRequest = async () => {
      const _cost = Number(cost);
      
      if(!_cost){
        alert('가격 정보는 숫자만 입력해주세요!')
        return;
      }
      
      const res = await axios.post(
        `${APIURL}/auction/${auction_id}`,
        {
          image: image.data,
          mime: image.mime,
          cost: _cost,
          tattooist_id: getCookie("tattooist_id"),
        }
      );
  
      if (res.data.success) {
        goAuctionDetail(auction_id);
      } else if(res.data.code === 24) {
          alert('이미 응찰 하였습니다.')
          console.log(res.data);
          goAuctionDetail(auction_id);
      } else {
        alert('응찰이 불가능 합니다');
        console.log(res.data);
        console.log(`${APIURL}/auction/${auction_id}`);
      }
    };
  
    const onSubmit = () => {
      if (!src || !cost) {
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
          </LoadedImgDescDiv>
        </ImgInfoDiv>
  
        <ImgUploadBtn onSubmit={onSubmit} text="응찰 등록" />
      </>
    );
}

export default BidderUpload;