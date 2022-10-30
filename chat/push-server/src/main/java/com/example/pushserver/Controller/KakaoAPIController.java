package com.example.pushserver.Controller;

import com.example.pushserver.Dto.RequestDTO;
import com.example.pushserver.Service.*;
import com.example.pushserver.vo.RequestLogin;
import com.example.pushserver.vo.RequestPush;
import com.google.firebase.messaging.FirebaseMessagingException;
import com.google.gson.Gson;
import com.google.gson.JsonObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

@RestController
public class KakaoAPIController {

    @Autowired
    AuthService authService;

    @Autowired
    CustomMessageService customMessageService;

    @Autowired
    MessageService messageService;

    Map<String, String> usermap = new HashMap<>();

    @PostMapping("/ping")
    public ResponseEntity ping(@RequestBody RequestPush vo) {
        Gson gson = new Gson();
        JsonObject temp = new JsonObject();
        HttpHeaders responseHeaders = new HttpHeaders();
        responseHeaders.add("Content-Type", "application/json; charset=UTF-8");
        temp.addProperty("success", true);
        return new ResponseEntity<>(gson.toJson(temp), responseHeaders,HttpStatus.OK);
    }

    @PostMapping("/push/{push_case}")
    public ResponseEntity ReserveDelete(@PathVariable int push_case, @RequestBody RequestPush vo) throws FirebaseMessagingException {
        Gson gson = new Gson();
        JsonObject temp = new JsonObject();
        HttpHeaders responseHeaders = new HttpHeaders();
        responseHeaders.add("Content-Type", "application/json; charset=UTF-8");
        System.out.println(vo);

        if (vo.getToken() == null) {
            temp.addProperty("success", true);
            return new ResponseEntity<>(gson.toJson(temp), responseHeaders,HttpStatus.OK);
        } else {
            String tattooist = vo.getTattooist_id();
            String customer = vo.getUser_id();
            String access_Token = vo.getToken();
            String target = messageService.getFriends(access_Token);
            switch (push_case) {
                case 1 : // 상담문의 -> 유저 브라우저 알림, 타투이스트 브라우저 알림, 타투이스트 카톡 알림
                    System.out.println("상담문의");
                    // 타투이스트 카카오 계정을 기반으로 메시지 보내기
                    customMessageService.sendInquireFriendMessage(target);
                    // 유저 브라우저 알림
                    fcmService.sendpush(usermap.get(customer), "상담문의 요청이 완료되었습니다.");
                    // 타투이스트 브라우저 알림
                    fcmService.sendpush(usermap.get(tattooist), "상담문의 요청이 도착하였습니다.");
                    break;
                case 2 : // 예약확정 -> 유저 브라우저 알림, 유저 카톡 알림, 타투이스트 카톡 알림
                    System.out.println("예약확정");
                    // 유저 카톡 알림
                    customMessageService.sendReservationMessage(access_Token);
                    // 타투이스트 카톡 알림
                    customMessageService.sendReservationFriendMessage(target);
                    // 유저 브라우저 알림
                    fcmService.sendpush(usermap.get(customer), "예약이 확정되었습니다.");
                    break;
                case 3 : // 예약취소 -> 유저 브라우저 알림, 유저 카톡 알림, 타투이스트 브라우저 알림
                    System.out.println("예약취소");
                    // 유저 카톡 알림
                    customMessageService.sendReservationCancelMessage(access_Token);
                    // 유저 브라우저 알림
                    fcmService.sendpush(usermap.get(customer), "예약이 취소되었습니다.");
                    // 타투이스트 브라우저 알림
                    fcmService.sendpush(usermap.get(tattooist), "예약이 취소되었습니다.");
                    break;
                case 10 : // 이력제골 -> 유저 카톡 알림, 타투이스트 브라우저 알림
                    System.out.println("이력제공");
                    // 유저 카톡 알림
                    customMessageService.sendHistoryFriendMessage(target);
                    // 타투이스트 브라우저 알림
                    fcmService.sendpush(usermap.get(tattooist), "이력을 조회하였습니다.");
                    break;
                case 20 : // 작업시작 -> 유저 카톡 알림, 타투이스트 브라우저 알림
                    System.out.println("작업시작");
                    // 유저 카톡 알림
                    customMessageService.sendWorkStartMessage(access_Token);
                    // 타투이스트 브라우저 알림
                    fcmService.sendpush(usermap.get(tattooist), "작업이 시작되었습니다.");
                    break;
                case 21 : // 작업종료 -> 유저 카톡 알림, 타투이스트 브라우저 알림
                    System.out.println("작업종료");
                    // 유저 카톡 알림
                    customMessageService.sendWorkFinishMessage(access_Token);
                    // 타투이스트 브라우저 알림
                    fcmService.sendpush(usermap.get(tattooist), "작업이 종료되었습니다.");
                    break;
                case 30 : // 경매응찰 -> 유저 브라우저 알림, 유저 카톡 알림
                    System.out.println("새로운경매입찰");
                    // 유저 카톡 알림
                    customMessageService.sendAuctionFriendMessage(target);
                    // 유저 브라우저 알림
                    fcmService.sendpush(usermap.get(customer), "경매가 응찰되었습니다.");
                    break;
                case 32 : // 경매낙찰 -> 타투이스트 브라우저 알림, 타투이스트 카톡 알림
                    System.out.println("경매낙찰");
                    customMessageService.sendBidSuccessFriendMessage(target);
                    fcmService.sendpush(usermap.get(tattooist), "축하드립니다. 낙찰 되었습니다.");
                    break;
            }

            temp.addProperty("success", true);
            return new ResponseEntity<>(gson.toJson(temp), responseHeaders,HttpStatus.OK);
        }
    }

    @GetMapping("/login/kakao")
    public ResponseEntity serviceStart(@RequestParam String code) {
        System.out.println(code);
        Gson gson = new Gson();
        JsonObject temp = new JsonObject();
        HttpHeaders responseHeaders = new HttpHeaders();
        responseHeaders.add("Content-Type", "application/json; charset=UTF-8");

        if(authService.getKakaoAuthToken(code)) {
//            customMessageService.sendMyMessage();
            System.out.println("authtoken : " + AuthService.authToken);
            temp.addProperty("success", true);

            temp.addProperty("token", AuthService.authToken);
        }else {
            temp.addProperty("success", false);
        }

        return new ResponseEntity<>(gson.toJson(temp), responseHeaders,HttpStatus.OK);
    }

    @PostMapping("/fcm/token")
    public ResponseEntity fcmStart(@RequestBody RequestLogin vo) {
        System.out.println("token저장");
        Gson gson = new Gson();
        JsonObject temp = new JsonObject();
        HttpHeaders responseHeaders = new HttpHeaders();
        responseHeaders.add("Content-Type", "application/json; charset=UTF-8");

        usermap.put(vo.getId(), vo.getFcm());
        System.out.println(usermap);
        temp.addProperty("success", true);
        return new ResponseEntity<>(gson.toJson(temp), responseHeaders,HttpStatus.OK);
    }

    @PostMapping("/push/kakao")
    public ResponseEntity getToken(@RequestBody RequestPush vo) {
        Gson gson = new Gson();
        JsonObject temp = new JsonObject();
        HttpHeaders responseHeaders = new HttpHeaders();
        responseHeaders.add("Content-Type", "application/json; charset=UTF-8");
        System.out.println(vo);
        String access_Token = vo.getToken();
        int case_id = vo.getCase_id();
        switch (case_id) {
            case 1 : // 상담문의 -> 유저 브라우저 알림, 타투이스트 브라우저 알림, 타투이스트 카톡 알림
                // 타투이스트 카카오 계정을 기반으로 메시지 보내기
                System.out.println("상담문의");
                customMessageService.sendInquireMessage(access_Token);
                break;
            case 2 : // 예약확정 -> 유저 브라우저 알림, 유저 카톡 알림, 타투이스트 카톡 알림
                // 유저 카카오 계정을 기반으로 메시지 보내기
                System.out.println("예약확정");
                customMessageService.sendReservationMessage(access_Token);
                break;
            case 3 : // 예약취소 -> 유저 브라우저 알림, 유저 카톡 알림, 타투이스트 브라우저 알림
                System.out.println("예약취소");
                customMessageService.sendReservationCancelMessage(access_Token);
                break;
            case 10 : // 이력제골 -> 유저 카톡 알림, 타투이스트 브라우저 알림
                System.out.println("이력제공");
                customMessageService.sendHistoryMessage(access_Token);
                break;
            case 20 : // 작업시작 -> 유저 카톡 알림, 타투이스트 브라우저 알림
                System.out.println("작업시작");
                customMessageService.sendWorkStartMessage(access_Token);
                break;
            case 21 : // 작업종료 -> 유저 카톡 알림, 타투이스트 브라우저 알림
                System.out.println("작업종료");
                customMessageService.sendWorkFinishMessage(access_Token);
                break;
            case 30 : // 경매응찰 -> 유저 브라우저 알림, 유저 카톡 알림
                System.out.println("새로운경매입찰");
                customMessageService.sendAuctionMessage(access_Token);
                break;
            case 32 : // 경매낙찰 -> 타투이스트 브라우저 알림, 타투이스트 카톡 알림
                System.out.println("경매낙찰");
                customMessageService.sendBidSuccessMessage(access_Token);
                break;
        }

        temp.addProperty("success", true);
        return new ResponseEntity<>(gson.toJson(temp), responseHeaders,HttpStatus.OK);
    }

    @GetMapping("/test")
    public String test(String code) {
        System.out.println(code);
        if (authService.getKakaoAuthToken(code)) {
            customMessageService.sendTestMessage();
            String target = messageService.getFriends(AuthService.authToken);
            customMessageService.sendTestFriendMessage(target);
            return "메시지 전송 성공";
        } else {
            return "토큰발급 실패";
        }
    }


    @Autowired
    private FCMService fcmService;

    @Autowired
    FCMinitializer fcmInitializer;

    @PostMapping("/api/fcm")
    public ResponseEntity pushMessage(@RequestBody RequestDTO requestDTO) throws IOException, FirebaseMessagingException {
//        fcmInitializer.initialize();
//        fcmInitializer.getAccessToken();
        System.out.println(requestDTO.getTargetToken() + " "
                + requestDTO.getTitle() + " " + requestDTO.getBody());

        fcmService.sendpush(requestDTO.getTargetToken(), requestDTO.getBody());
//        fcmService.sendMessageTo(
//                requestDTO.getTargetToken(),
//                requestDTO.getTitle(),
//                requestDTO.getBody());
        return ResponseEntity.ok().build();
    }


}
