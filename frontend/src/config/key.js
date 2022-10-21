export const APIURL = "http://3.39.196.91:3001";
export const CHATAPIURL = "http://52.79.119.226:3002";
export const WEBSOCKETURL = "ws://52.79.119.226:3002/chating";
export const PUSHURL = "http://43.201.89.143:3030";

export const KAKAODOMAIN = "https://kauth.kakao.com/oauth/authorize"
export const APIKEY = "f5dd209f82ba7318a08eac96c8ae0515"
export const REDIRECTURI = "http://localhost:3000"
export const ERRORURI = `${REDIRECTURI}?error=access_denied&error_description=User%20denied%20access`

export const KAKAOURL = `https://kauth.kakao.com/oauth/authorize?client_id=${APIKEY}&redirect_uri=${REDIRECTURI}&response_type=code`