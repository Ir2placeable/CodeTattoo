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

const ProfileEdit = ({ apiUrl, cookies, setCookie, removeCookie }) => {
  const params = useParams();
  const [src, setSrc] = useState(null);
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
  }

  const sendRequest = async() => {
    const edit_data = {
      nickname: nickname,
      specialize: specialize,
      office: {
        location: address,
        contact: contact
      },
      profile: {
        description: description,
        image: image
      }
    }
    const res = await axios.post(`${apiUrl}/tattooist/mypage/edit`, {
      tattooist_id: cookies.isTattooist,
      edit_data: edit_data
    })
    console.log(res);
  }
  const removeCookies = () => {
    removeCookie('specialize', {path: '/tattooist/mypage'})
    removeCookie('nickname', {path: '/tattooist/mypage'})
    removeCookie('address', {path: '/tattooist/mypage'})
    removeCookie('contact', {path: '/tattooist/mypage'})
    removeCookie('image', {path: '/tattooist/mypage'})
    removeCookie('description', {path: '/tattooist/mypage'})
  }

  const onSubmit = () => {
    sendRequest();
    //removeCookies();
    window.location.replace(`/tattooist/mypage/${cookies.isTattooist}`);
  }

  return (
    <>
    <EnrollDiv>
      <EnrollBox>
        <EnrollBigText>Edit Information</EnrollBigText>
        <EnrollUl>
          <EnrollText>Profile Image</EnrollText>
          <ProfileImage src={src} setSrc={setSrc} image={image} setImage={setImage} />
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