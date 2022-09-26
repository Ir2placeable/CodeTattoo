import axios from "axios";
import React, { useState } from "react";
import {
  getCookie,
  setCookie,
} from "../../config/cookie";
import { APIURL } from "../../config/key";
import {
  EditImgBox,
  ProfileImgBox,
  ProfileImg,
  ProfileNickname,
  ProfileFormBox,
} from "../../styledComponents";
import ProfileImgChoice from "../atomic/edit/ProfileImgChoice";
import ProfileUploadBtn from "../atomic/edit/ProfileUploadBtn";
import Loader from "../atomic/common/Loader";
import { useNavigate } from "react-router-dom";
import { goMyPage, goTattooistDetail } from "../../config/navigate";

/**
 * 상위 컴포넌트 === ShowProfileEdit.jsx 
 * 프로필 이미지 편집 템플릿
 */
const ImageEdit = () => {
  // 로딩 여부
  const [loading, setLoading] = useState(false);
  
  // 이미지 (base64 형식)
  const [src, setSrc] = useState(getCookie("profile_img_src"));
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

  // 프로필 이미지 변경 요청 API
  const sendRequest = async () => {
    let url = `${APIURL}`;
    if (getCookie("user_id")) url += `/user/my-page/${getCookie("user_id")}`;
    else if (getCookie("tattooist_id"))
      url += `/tattooist/my-page/${getCookie("tattooist_id")}`;

    const res = await axios.post(url, {
      image: image.data,
      mime: image.mime,
    });

    
    if (res.data.success) {
      setCookie("profile_img_src", res.data.image, { maxAge: 3000, path: "/" });

      if(getCookie("user_id")) {
        goMyPage(getCookie("user_id"));
      } else {
        goTattooistDetail(getCookie("tattooist_id"));
      }
      window.location.reload()

    } else {
      alert("이미지 등록에 실패했습니다.");
    }
    setLoading(false);
  };

  const onSubmit = () => {
    setLoading(true)
    setTimeout(() => {
      sendRequest();
    }, 1000)
  };

  if (loading) {
    return <Loader type="spin" color="#000000" />;
  }

  return (
    <>
      <ProfileFormBox>
        <EditImgBox>
          <ProfileImgChoice onSelectFile={onSelectFile} />
          <ProfileImgBox size="edit">
            <ProfileImg size="edit" src={src} onLoad={onLoad} />
          </ProfileImgBox>
          <ProfileNickname>{getCookie("nickname")}</ProfileNickname>
          <ProfileUploadBtn onSubmit={onSubmit} type="image" text="등록" />
        </EditImgBox>
      </ProfileFormBox>
    </>
  );
};

export default ImageEdit;
