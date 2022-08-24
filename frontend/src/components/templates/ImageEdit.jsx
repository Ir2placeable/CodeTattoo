import axios from "axios";
import React, { useState, useEffect } from "react";
import {
  getCookie,
  removeCookie,
  resetCookie,
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

const ImageEdit = () => {
  const [src, setSrc] = useState(getCookie("profile_img_src"));
  const [image, setImage] = useState({
    data: "",
    mime: "",
  });

  const onSelectFile = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader();

      // base64 형식으로 읽어오기
      reader.readAsDataURL(e.target.files[0]);

      reader.addEventListener("load", () => {
        setSrc(reader.result);
        pushCookie(reader.result);
      });
    }
    // console.log(src);
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
    let url = `${APIURL}`;
    if (getCookie("user_id")) url += `/user/my-page/${getCookie("user_id")}`;
    else if (getCookie("tattooist_id"))
      url += `/tattooist/my-page/${getCookie("tattooist_id")}`;

    const res = await axios.post(url, {
      image: image.data,
      mime: image.mime,
    });

    if (res.data.success) {
      alert("이미지 등록에 성공했습니다.");
      window.location.reload();
    } else {
      alert("이미지 등록에 실패했습니다.");
    }
  };

  const pushCookie = (imgSrc) => {
    removeCookie("profile_img_src");
    setCookie("profile_img_src", imgSrc, { maxAge: 3000, path: "/" });
  };

  const onSubmit = () => {
    sendRequest();
  };

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
