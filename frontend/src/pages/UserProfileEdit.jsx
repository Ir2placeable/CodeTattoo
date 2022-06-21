import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  MyPageMainDiv,
  EnrollDiv,
  EnrollBox,
  EnrollBigText,
  EnrollUl,
  EnrollLi,
  EnrollText,
  EnrollLabel,
  EnrollInput,
  EnrollBtn,
} from '../styledComponents';
import ProfileImage from './ProfileImage';

const UserProfileEdit = ({ apiUrl, cookies }) => {
  const [src, setSrc] = useState(null);
  const [image, setImage] = useState({
    width: 300,
    height: 300,
    data: '',
    mime: ''
  })
  const [isImgChange, setIsImgChange] = useState(false);
  const [isChange, setIsChange] = useState(false);
  const [input, setInput] = useState({
    name: cookies.name,
    location: cookies.location,
    description: cookies.user_desc
  })

  const {name, location, description} = input;

  const onChange = (e) => {
    const { name, value } = e.target;
    setInput({
      ...input,
      [name]: value
    })
    setIsChange(true);
  }

  const sendRequest = async() => {
    const res = await axios.put(`${apiUrl}/user/my-page`, {
      user_id: cookies.user_id,
      name: name,
      location: location,
      description: description
    });
    console.log(res);

    if(res.data.success){
      window.location.replace(`/user/mypage/${cookies.user_id}`);
    }
  }
  const editProfileImage = async() => {
    const res = await axios.put(`${apiUrl}/user/my-page/image`, {
      user_id: cookies.user_id,
      image: image.data,
      mime: image.mime
    })

    if(res.data.success && !isChange){
      window.location.replace(`/user/mypage/${cookies.user_id}`);
    }
  }

  const navigate = useNavigate();
  const onSubmit = () => {
    if(isImgChange && !isChange){
      editProfileImage();
    } else if (!isImgChange && isChange){
      sendRequest();
    } else if (isImgChange && isChange){
      editProfileImage();
      sendRequest();
    }
    
    //navigate(`/user/mypage/${cookies.user_id}`)
    // window.location.replace(`/user/mypage/${cookies.user_id}`);
  }


  return (
    <>
      <EnrollDiv>

        <EnrollBox>

          <EnrollBigText>Endit Information</EnrollBigText>

          <EnrollUl>
            <EnrollText>Profile Image</EnrollText>
            <ProfileImage 
            src={src} setSrc={setSrc}
            image={image} setImage={setImage}
            isImgChange={isImgChange} setIsImgChange={setIsImgChange}
            cookies={cookies} userMode={true} />
          </EnrollUl>

          <EnrollUl>
            <EnrollText>Profile Description</EnrollText>

            <EnrollLi>
              <EnrollLabel>자기소개
                <EnrollInput
                  type="text"
                  name="description"
                  value={description}
                  onChange={onChange}
                   />
              </EnrollLabel>
            </EnrollLi>
          </EnrollUl>

          <EnrollUl>
            <EnrollText>Information</EnrollText>

            <EnrollLi>
              <EnrollLabel>닉네임
                <EnrollInput
                  type="text"
                  name="name"
                  value={name}
                  onChange={onChange}
                />
              </EnrollLabel>
            </EnrollLi>

            <EnrollLi>
              <EnrollLabel>주소
                <EnrollInput
                  type="text"
                  name="location"
                  value={location}
                  onChange={onChange}
                />
              </EnrollLabel>
            </EnrollLi>
          </EnrollUl>

          <EnrollBtn onClick={onSubmit}>
              <span>수정</span>
          </EnrollBtn>

        </EnrollBox>

      </EnrollDiv>
    </>
  );
};

export default UserProfileEdit;