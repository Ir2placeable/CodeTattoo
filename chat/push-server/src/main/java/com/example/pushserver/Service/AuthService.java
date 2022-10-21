package com.example.pushserver.Service;

import org.json.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;

// HttpCallService를 통해 카카오 API에서 토큰을 발급받을 클래스
@Service
public class AuthService extends HttpCallService{
    private Logger logger = LoggerFactory.getLogger(this.getClass());

    private static final String AUTH_URL = "https://kauth.kakao.com/oauth/token";

    public static String authToken;
    public static String client_id = "f5dd209f82ba7318a08eac96c8ae0515";
    public static String redirect_url = "http://localhost:3030/test";
//    public boolean getAuthCode() {
//        HttpHeaders header = new HttpHeaders();
//        MultiValueMap<String, String> parameters = new LinkedMultiValueMap<>();
//
//        header.set()
//    }

    public boolean getKakaoAuthToken(String code)  {
        HttpHeaders header = new HttpHeaders();
        String accessToken = "";
        String refrashToken = "";
        MultiValueMap<String, String> parameters = new LinkedMultiValueMap<>();

        header.set("Content-Type", APP_TYPE_URL_ENCODED);

        parameters.add("code", code);
        parameters.add("grant_type", "authorization_code");
        parameters.add("client_id", "f5dd209f82ba7318a08eac96c8ae0515");
        parameters.add("redirect_url", "http://localhost:3030");

        HttpEntity<?> requestEntity = httpClientEntity(header, parameters);

        ResponseEntity<String> response = httpRequest(AUTH_URL, HttpMethod.POST, requestEntity);
        JSONObject jsonData = new JSONObject(response.getBody());
        accessToken = jsonData.get("access_token").toString();
        refrashToken = jsonData.get("refresh_token").toString();
        if(accessToken.isEmpty() || refrashToken.isEmpty()) {
            logger.debug("토큰발급에 실패했습니다.");
            return false;
        }else {
            authToken = accessToken;
            System.out.println("authToken = " + authToken);
            return true;
        }
    }
}
