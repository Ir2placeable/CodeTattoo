import React, {useState, useEffect} from 'react';
import { useCookies } from 'react-cookie';

const CookieTest = () => {
  // key는 rememberNumber
  const [cookies, setCookie, removeCookie] = useCookies(['rememberNumber']);
  const [text, setText] = useState('');

  useEffect(() => {
    getCookieFunc();
  }, []);

  const setCookieFunc = () => {
    let random = Math.floor(Math.random() * (10 - 0) + 0);
    setCookie('rememberNumber', random, {maxAge:2000});
    
    let result = "setCookie : "+random;
    setText(result);
  }

  const getCookieFunc = (param) => {
    let result = "getCookie : "+cookies.rememberNumber;
    setText(result);
  }

  const removeCookieFunc = () => {
    removeCookie('rememberNumber');

    setText("removeCookie");
  }



  return(
    <div>
      <button onClick={setCookieFunc}>set cookie</button>
      <button onClick={getCookieFunc}>get cookie</button>
      <button onClick={removeCookieFunc}>remove cookie</button>

      <p>{text}</p>
    </div>


    
  );
};

export default CookieTest;