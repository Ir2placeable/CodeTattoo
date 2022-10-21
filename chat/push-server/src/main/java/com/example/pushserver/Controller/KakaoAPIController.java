package com.example.pushserver.Controller;

import com.example.pushserver.Service.AuthService;
import com.example.pushserver.Service.CustomMessageService;
import com.example.pushserver.vo.RequestPush;
import com.google.gson.Gson;
import com.google.gson.JsonObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
public class KakaoAPIController {

    @Autowired
    AuthService authService;

    @Autowired
    CustomMessageService customMessageService;

    @PostMapping("/push/{push_case}")
    public ResponseEntity ReserveDelete(@PathVariable int push_case, @RequestBody RequestPush vo) {
        Gson gson = new Gson();
        JsonObject temp = new JsonObject();
        HttpHeaders responseHeaders = new HttpHeaders();
        responseHeaders.add("Content-Type", "application/json; charset=UTF-8");
        System.out.println(vo);
        switch (push_case) {
            case 1 : // 상담문의 -> 유저 브라우저 알림, 타투이스트 브라우저 알림, 타투이스트 카톡 알림
                // 타투이스트 카카오 계정을 기반으로 메시지 보내기
                System.out.println("상담문의");
                break;
            case 2 : // 예약확정 -> 유저 브라우저 알림, 유저 카톡 알림, 타투이스트 카톡 알림
                // 유저 카카오 계정을 기반으로 메시지 보내기
                System.out.println("예약확정");
                break;
            case 3 : // 예약취소 -> 유저 브라우저 알림, 유저 카톡 알림, 타투이스트 브라우저
                System.out.println("예약취소");
                break;
            case 10 :
                System.out.println("이력제공");
                break;
            case 20 :
                System.out.println("작업시작");
                break;
            case 21 :
                System.out.println("작업종료");
                break;
            case 30 :
                System.out.println("새로운경매입찰");
                break;
            case 31 :
                System.out.println("새로운채팅수신");
                break;
            case 32 :
                System.out.println("경매입찰성공");
                break;
        }

        temp.addProperty("success", true);
        return new ResponseEntity<>(gson.toJson(temp), responseHeaders,HttpStatus.OK);
    }

    @GetMapping("/test")
    public ResponseEntity serviceStart(@RequestParam String code) {
        System.out.println(code);
        Gson gson = new Gson();
        JsonObject temp = new JsonObject();
        HttpHeaders responseHeaders = new HttpHeaders();
        responseHeaders.add("Content-Type", "application/json; charset=UTF-8");

        if(authService.getKakaoAuthToken(code)) {
            customMessageService.sendMyMessage();
            temp.addProperty("success", true);
        }else {
            temp.addProperty("success", false);
        }
        return new ResponseEntity<>(gson.toJson(temp), responseHeaders,HttpStatus.OK);
    }

    @GetMapping("/reservation")
    public String reservationCall(String code) {
        if(authService.getKakaoAuthToken(code)) {
            customMessageService.sendReservationMessage();
            return "메시지 전송 성공";
        }else {
            return "토큰발급 실패";
        }
    }

    @GetMapping("/workstart")
    public String workstartCall(String code) {
        if(authService.getKakaoAuthToken(code)) {
            customMessageService.sendWorkStartMessage();
            return "메시지 전송 성공";
        }else {
            return "토큰발급 실패";
        }
    }

    @GetMapping("/workfinish")
    public String workfinishCall(String code) {
        if(authService.getKakaoAuthToken(code)) {
            customMessageService.sendWorkFinishMessage();
            return "메시지 전송 성공";
        }else {
            return "토큰발급 실패";
        }
    }

    @GetMapping("/auction")
    public String auctionCall(String code) {
        if(authService.getKakaoAuthToken(code)) {
            customMessageService.sendAuctionMessage();
            return "메시지 전송 성공";
        }else {
            return "토큰발급 실패";
        }
    }
}
