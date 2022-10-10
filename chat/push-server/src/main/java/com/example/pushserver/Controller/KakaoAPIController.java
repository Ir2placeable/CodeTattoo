package com.example.pushserver.Controller;

import com.example.pushserver.Service.AuthService;
import com.example.pushserver.Service.CustomMessageService;
import com.google.gson.Gson;
import com.google.gson.JsonObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class KakaoAPIController {

    @Autowired
    AuthService authService;

    @Autowired
    CustomMessageService customMessageService;

    @GetMapping("/kakao")
    public ResponseEntity kakaoCall(@RequestParam String code) {
        Gson gson = new Gson();
        JsonObject temp = new JsonObject();
        HttpHeaders responseHeaders = new HttpHeaders();
        responseHeaders.add("Content-Type", "application/json; charset=UTF-8");

        System.out.println("code = " + code);
        if(authService.getKakaoAuthToken(code)) {
            customMessageService.sendMyMessage();
            temp.addProperty("success", true);
            return new ResponseEntity<>(gson.toJson(temp), responseHeaders, HttpStatus.OK);
        }else {
            temp.addProperty("success", "true");
            temp.addProperty("success", false);
            return new ResponseEntity<>(gson.toJson(temp), responseHeaders, HttpStatus.OK);
        }
    }
}
