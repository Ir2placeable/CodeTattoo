import React from 'react';
import { 
  setCookie, getCookie, removeCookie, getAllCookie
} from './config/cookie';

const CookieTest = () => {
  const onSet = () => {
    setCookie('cookieKey', 'cookieValue', {
      path: '/',
      secure: true,
      maxAge: 3000
    })
    setCookie('cookieKey2', 'cookieValue2', {
      path: '/',
      secure: true,
      maxAge: 3000
    })
  }
  const onGet = () => {
    const getVal = getCookie('cookieKey');
    console.log(getVal);
  }
  const onGetAll = () => {
    const getAll = getAllCookie();
    console.log(getAll);
  }
  const onRemove = () => {
    removeCookie('cookieKey')
  }

  return (
    <>
      <button onClick={onSet} type="button">set cookie</button>
      <button onClick={onGet} type="button">get cookie</button>
      <button onClick={onGetAll} type="button">get all cookie</button>
      <button onClick={onRemove} type="button">remove cookie</button>
    </>
  );
};

export default CookieTest;