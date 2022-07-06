import axios from 'axios';
import React, { useState } from 'react';
import { APIURL } from '../../config/key';

// - PUT :  http://3.39.196.91:3001/user/my-page
// - body : { user_id, nickname, description }
// - return : { success }
// - PUT : http://3.39.196.91:3001/tattooist/my-page
// - body : { tattooist_id, nickname, description, specialize, office, contact }
// - return : { success }
const EditProfile = ({ cookies, filter, setCookie }) => {
  const [info, setInfo] = useState({
    nickname: cookies.nickname,
    description: cookies.profile_desc,
    specialize: cookies.specialize,
    office: cookies.office,
    contact: cookies.contact
  })

  const { nickname, description, specialize, 
    office, contact } = info;

  const pushCookie = () => {
    setCookie('nickname', info.nickname, {maxAge: 3000, path: '/'});
    setCookie('profile_desc', info.description, {maxAge: 3000, path: '/'});
    setCookie('specialize', info.specialize, {maxAge: 3000, path: '/'});
    setCookie('office', info.office, {maxAge: 3000, path: '/'});
    setCookie('contact', info.contact, {maxAge: 3000, path: '/'});
  }

  const sendRequest = async() => {
    const res = await axios.put(`${APIURL}/${filter}/my-page`, {
      user_id: cookies.user_id,
      tattooist_id: cookies.tattooist_id,
      nickname: info.nickname,
      description: info.description,
      specialize: info.specialize,
      office: info.office,
      contact: info.contact
    })

    if(res.data.success){
      let _id = cookies.user_id;
      if(!_id){
        _id = cookies.tattooist_id;
      }
      pushCookie();
      window.location.replace(`/mypage/${filter}/${_id}`)
    }
  }

  const onChange = (e) => {
    const { name, value } = e.target;

    setInfo({
      ...info,
      [name]: value
    })
  }

  const onClick = () => {
    sendRequest();
  }

  return (
    <>
      <div>닉네임
        <input 
          type="text"
          name="nickname"
          value={nickname}
          onChange={onChange}
        />
      </div>
      <div>자기소개
        <input 
          type="text"
          name="description"
          value={description}
          onChange={onChange}
        />
      </div>

      {filter === 'tattooist' && (
        <div>
          <div>Specialize
            <input 
              type="text"
              name="specialize"
              value={specialize}
              onChange={onChange}
            />
          </div>
          <div>Office
            <input 
              type="text"
              name="office"
              value={office}
              onChange={onChange}
            />
          </div>
          <div>Contact
            <input 
              type="text"
              name="contact"
              value={contact}
              onChange={onChange}
            />
          </div>
        </div>
      )}

      <div onClick={onClick}>
        수정
      </div>
    </>
  );
};

export default EditProfile;