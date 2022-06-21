import React, {useEffect, useState} from 'react';
import ProfileImage from './ProfileImage';
import { useParams } from 'react-router-dom';
import axios from 'axios';
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
import { useNavigate } from 'react-router-dom';

const ProfileEdit = ({ apiUrl, cookies, setCookie, removeCookie }) => {
  const params = useParams();
  const [src, setSrc] = useState(null);
  const [isImgChange, setIsImgChange] = useState(false);
  const [isChange, setIsChange] = useState(false);

  const [image, setImage] = useState({
    width: 300,
    height: 300,
    data: '',
    mime: ''
  })
  const [input, setInput] = useState({
    nickname: cookies.nickname,
    specialize: cookies.specialize,
    address: cookies.address,
    contact: cookies.contact,
    description: cookies.description
  })

  const { nickname, specialize, address, contact, description } = input;

  const onChange = (e) => {
    const { name, value } = e.target;
    setInput({
      ...input,
      [name]: value
    })
    setIsChange(true)
  }

  const sendRequest = async() => {
    const res = await axios.put(`${apiUrl}/tattooist/my-page`, {
      tattooist_id: cookies.isTattooist,
      nickname: nickname,
      specialize: specialize,
      location: address,
      contact: contact,
      description: description
    })
    console.log('정보 수정 : ',res);

    if(res.data.success){
      window.location.replace(`/tattooist/mypage/${cookies.isTattooist}`);
    }
  }

  const editProfileImage = async() => {
    const res = await axios.put(`${apiUrl}/tattooist/my-page/image`, {
      tattooist_id: cookies.isTattooist,
      image: image.data,
      mime: image.mime
    });
    console.log('사진 수정 : ',res);

    if(res.data.success && !isChange){
      window.location.replace(`/tattooist/mypage/${cookies.isTattooist}`);
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
    
    //navigate(`/tattooist/mypage/${cookies.isTattooist}`)
    // window.location.replace(`/tattooist/mypage/${cookies.isTattooist}`);
  }

  return (
    <>
    <EnrollDiv>
      <EnrollBox>
        <EnrollBigText>Edit Information</EnrollBigText>
        <EnrollUl>
          <EnrollText>Profile Image</EnrollText>
          <ProfileImage 
            src={src} setSrc={setSrc}
            image={image} setImage={setImage}
            isImgChange={isImgChange} setIsImgChange={setIsImgChange}
            cookies={cookies} userMode={false} />
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
                name="nickname"
                value={nickname}
                onChange={onChange}
              />
            </EnrollLabel>
          </EnrollLi>

          <EnrollLi>
            <EnrollLabel>Specialize
              <EnrollInput 
                type="text"
                name="specialize"
                value={specialize}
                onChange={onChange}
              />
            </EnrollLabel>
          </EnrollLi>

          <EnrollLi>
            <EnrollLabel>주소
              <EnrollInput 
                type="text"
                name="address"
                value={address}
                onChange={onChange}
              />
            </EnrollLabel>
          </EnrollLi>

          <EnrollLi>
            <EnrollLabel>Contact
              <EnrollInput 
                type="text"
                name="contact"
                value={contact}
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

export default React.memo(ProfileEdit);