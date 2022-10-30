import axios from "axios";
import React, { useState } from "react";
import { getCookie } from "../../../config/cookie";
import { APIURL } from "../../../config/key";
import {
  EditImgBox,
  ProfileImg,
  ProfileImgBox,
  ProfileNickname,
} from "../../../styledComponents";
import ProfileImgChoice from "../../atomic/edit/ProfileImgChoice";


// 삭제 
const EditImg = () => {
  const [src, setSrc] = useState(null);
  const [image, setImage] = useState({
    data: "",
    mime: "",
  });

  const onSelectFile = (e) => {
    console.log(`onSelectFile start`);
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader();

      // base64 형식으로 읽어오기
      reader.readAsDataURL(e.target.files[0]);

      reader.addEventListener("load", () => {
        setSrc(reader.result);
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
      console.log("프로필 이미지 등록 성공");
      window.location.replace("/edit/profile");
    } else if (res.data.code === 8) {
      console.log("이미지 크기 10MB 초과")
      window.location.replace("/edit/profile");
    } else {
      console.log("프로필 이미지 등록 실패");
      window.location.replace("/edit/profile");
    }
  };

  return (
    <>
      <EditImgBox>
        <ProfileImgBox size="edit">
          <ProfileImg size="edit" src={src} onLoad={onLoad} />
        </ProfileImgBox>
        <ProfileNickname>Mingxoo</ProfileNickname>
        <ProfileImgChoice onSelectFile={onSelectFile} />
      </EditImgBox>
    </>
  );
};

export default EditImg;
