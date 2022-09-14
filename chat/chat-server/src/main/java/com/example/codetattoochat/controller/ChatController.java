package com.example.codetattoochat.controller;

import com.example.codetattoochat.dto.MessageDto;
import com.example.codetattoochat.handler.SocketHandler;
import com.example.codetattoochat.service.APIInfo;
import com.example.codetattoochat.service.MessageService;
import com.example.codetattoochat.service.GetOpponentInfo;
import com.example.codetattoochat.vo.RequestReserveSend;
import com.example.codetattoochat.vo.RequestSend;
import com.example.codetattoochat.vo.RequestUserId;
import com.example.codetattoochat.vo.ResponseUserList;
import com.google.gson.Gson;
import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import lombok.Data;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import java.net.URISyntaxException;
import java.text.SimpleDateFormat;
import java.time.LocalDateTime;
import java.util.*;

import org.springframework.http.HttpHeaders;

@Controller
@RestController
@Slf4j
@Data
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class ChatController {
    private MessageService messageService;
    private Environment env;
    final String url = "http://3.39.196.91:3001";
    final String endpoint = "/chat/profile/";

    @Autowired
    public ChatController(
            MessageService messageService,
            Environment env
    ) {
        this.messageService = messageService;
        this.env = env;
    }

    @Autowired
    GetOpponentInfo getOpponentInfo;

    @Autowired
    SocketHandler socketHandler;

    @GetMapping("/ping")
    public APIInfo ping() {
        APIInfo info = APIInfo.builder().app("CodeTattoo-Chat").ver("1.0").timestamp(LocalDateTime.now()).build();
        return info;
    }

    @PostMapping("/chat/user")
    public ResponseEntity saveUserId(@RequestBody RequestUserId vo) {
        Gson gson = new Gson();
        JsonObject temp = new JsonObject();
        HttpHeaders responseHeaders = new HttpHeaders();
        responseHeaders.add("Content-Type", "application/json; charset=UTF-8");

        if (socketHandler.currentUserid(vo.getUserid())) {
            log.info("Success User Session Map is : {}", socketHandler.getUserMap());
            temp.addProperty("success", "true");
            return new ResponseEntity<>(gson.toJson(temp), responseHeaders,HttpStatus.OK);
        } else {
            log.info("failed User Session Map is : {}", socketHandler.getUserMap());
            temp.addProperty("success", "false");
            return new ResponseEntity<>(gson.toJson(temp), responseHeaders,HttpStatus.OK);
        }
    }

    @PostMapping("/chat/send") // 메시지 저장
    public ResponseEntity send(@RequestBody RequestSend vo) {
        Gson gson = new Gson();
        JsonObject temp = new JsonObject();
        HttpHeaders responseHeaders = new HttpHeaders();
        responseHeaders.add("Content-Type", "application/json; charset=UTF-8");

        MessageDto messageDto = MessageDto.builder()
                .sender(vo.getSender())
                .receiver(vo.getReceiver())
                .content(vo.getContent())
                .createdAt(vo.getCreated_at())
                .reservation_id(vo.getReservation_id())
                .build();

        if (messageService.send(messageDto).getReceiver() != null) {
            temp.addProperty("success", "true");
            return new ResponseEntity<>(gson.toJson(temp), responseHeaders,HttpStatus.OK);
        } else {
            temp.addProperty("success", "false");
            return new ResponseEntity<>(gson.toJson(temp), responseHeaders,HttpStatus.OK);
        }
    }

    @PostMapping("/chat/create")
    public ResponseEntity ReserveSend(@RequestBody RequestReserveSend vo) throws URISyntaxException {
        Date now = Calendar.getInstance().getTime();
        SimpleDateFormat formatter = new SimpleDateFormat("yyyy년 MM월 dd일 HH:mm:ss");
        String formatedNow = formatter.format(now);
        Gson gson = new Gson();
        JsonObject temp = new JsonObject();
        HttpHeaders responseHeaders = new HttpHeaders();
        responseHeaders.add("Content-Type", "application/json; charset=UTF-8");

        MessageDto messageDto = MessageDto.builder()
                .sender(vo.getUser_id())
                .receiver(vo.getTattooist_id())
                .content("안녕하세요! 상담문의 드립니다!")
                .reservation_id(vo.getReservation_id())
                .createdAt(formatedNow)
                .build();

        if (messageService.send(messageDto).getReceiver() != null) {
            temp.addProperty("success", true);
            return new ResponseEntity<>(gson.toJson(temp), responseHeaders,HttpStatus.OK);
        } else {
            temp.addProperty("success", false);
            return new ResponseEntity<>(gson.toJson(temp), responseHeaders,HttpStatus.OK);
        }
    }

    @GetMapping("/chat/reservation/{user_id}/{target_id}")
    public ResponseEntity getReserveList(@PathVariable String user_id, @PathVariable String target_id) throws URISyntaxException {
        HttpHeaders responseHeaders = new HttpHeaders();
        responseHeaders.add("Content-Type", "application/json; charset=UTF-8");
        List<ResponseUserList> result = new ArrayList<>();
        List<String> tattooists = new ArrayList<>();
        Gson gson = new Gson();
        JsonObject temp = new JsonObject();
        String targetURL = url + endpoint;
        String opponent = null;
        String OppoImg = null;
        String OppoNick = null;
        List<String> check = new ArrayList<>();

        log.info("UserId is : {}", user_id);
        log.info("OppoId is : {}", target_id);

        Iterable<MessageDto> messageList = messageService.getUserList(user_id);
        log.info("{} 's messageList is : {}", user_id, messageList);

        for (MessageDto v : messageList) {
            tattooists.add(v.getReceiver());

        }


        //만약 HandShakeMessage를 보냈다면, 바로 유저리스트를 가져옴
        if (!tattooists.contains(target_id)) { //아니라면 HandShakeMessage를 보냄
            log.info("tattooists : {}",tattooists);
            // 유저가 상담문의 버튼을 누르면 자동적으로 "안녕하세요, 상담문의 드립니다!" 라는 HandShakeMessage 전송
            MessageDto messageDto = MessageDto.builder()
                    .sender(user_id)
                    .receiver(target_id)
                    .content("안녕하세요! 상담문의 드립니다!")
                    .build();
            if (messageService.send(messageDto).getReceiver() == null) { // HandShakeMessage가 보내지지 않았을때 오류
                temp.addProperty("success", "false");
                temp.addProperty("status", "Sending HandShakeMessage is Failed");
                return new ResponseEntity<>(gson.toJson(temp), responseHeaders,HttpStatus.OK);
            }
            messageList = messageService.getUserList(user_id);
            log.info("{} 's messageList is : {}", user_id, messageList);
        }



        for (MessageDto v : messageList) {
            if (v.getSender().equals(user_id) && !v.getReceiver().equals(user_id)) { //내가 상대방한테 마지막으로 채팅을 보냈을때,
                opponent = v.getReceiver();
            } else if (!v.getSender().equals(user_id) && v.getReceiver().equals(user_id)) { //상대방이 나에게 마지막으로 채팅을 보냈을떄
                opponent = v.getSender();
            }
            if (check.contains(opponent))
                continue;
            else
                check.add(opponent);

            log.info("targetURL : {}", targetURL + "user" );
            String opponentInfo = getOpponentInfo.callAPIGet(targetURL  , user_id, opponent, "user");

            JsonObject jsonObject = JsonParser.parseString(opponentInfo).getAsJsonObject();
            OppoNick = jsonObject.get("profile").getAsJsonObject().get("nickname").getAsString();
            if (jsonObject.get("profile").getAsJsonObject().get("image") == null)
                OppoImg = "undefined";
            else
                OppoImg = jsonObject.get("profile").getAsJsonObject().get("image").getAsString();
            result.add(ResponseUserList.builder()
                    .opponent_id(opponent)
                    .opponent_image(OppoImg)
                    .opponent_nickname(OppoNick)
                    .content(v.getContent())
                    .createdAt(v.getCreatedAt())
                    .build());
        }
        check.clear();

        temp.addProperty("success", "true");
        JsonArray jArray = new JsonArray();
        for (ResponseUserList v : result) {
            JsonObject vtmp = new JsonObject();
            vtmp.addProperty("content", v.getContent());
            vtmp.addProperty("createdAt", v.getCreatedAt());
            vtmp.addProperty("opponent_id", v.getOpponent_id());
            vtmp.addProperty("opponent_image", v.getOpponent_image());
            vtmp.addProperty("opponent_nickname", v.getOpponent_nickname());
            jArray.add(vtmp);
        }
        temp.add("userlist", jArray);
        return new ResponseEntity<>(gson.toJson(temp), responseHeaders,HttpStatus.OK);
    }


    @GetMapping("/chat/list/{type}/{user_id}") // 상대방 유저 리스트 요청 API (채팅목록)
    public ResponseEntity getUserList(@PathVariable String user_id, @PathVariable String type) throws URISyntaxException {
        List<ResponseUserList> result = new ArrayList<>();
        Gson gson = new Gson();
        JsonObject temp = new JsonObject();
        String targetURL = url + endpoint;
        String opponent = null;
        String OppoImg = null;
        String OppoNick = null;
        List<String> check = new ArrayList<>();
        log.info("UserType is : {}", type);
        log.info("UserId is : {}", user_id);

        if (type != null && user_id != null) {
            Iterable<MessageDto> messageList = messageService.getUserList(user_id);
            log.info("{} 's messageList is : {}", user_id, messageList);

            if (messageList == null) {
                temp.addProperty("success", "true");
                temp.addProperty("status", "No Chat Opponent");
                HttpHeaders responseHeaders = new HttpHeaders();
                responseHeaders.add("Content-Type", "application/json; charset=UTF-8");
                return new ResponseEntity<>(gson.toJson(temp), responseHeaders,HttpStatus.OK);
            }

            if (type.equals("user")) {
                for (MessageDto v : messageList) {
                    if (v.getSender().equals(user_id) && !v.getReceiver().equals(user_id)) { //내가 상대방한테 마지막으로 채팅을 보냈을때,
                        opponent = v.getReceiver();
                    } else if (!v.getSender().equals(user_id) && v.getReceiver().equals(user_id)) { //상대방이 나에게 마지막으로 채팅을 보냈을떄
                        opponent = v.getSender();
                    }
                    log.info("opponent : {}", opponent);
                    if (check.contains(v.getReservation_id()))
                        continue;
                    else
                        check.add(v.getReservation_id());

                    log.info("targetURL : {}", targetURL + "user" );
                    String opponentInfo = getOpponentInfo.callAPIGet(targetURL  , user_id, opponent, "user");
                    JsonObject jsonObject = JsonParser.parseString(opponentInfo).getAsJsonObject();
                    OppoNick = jsonObject.get("profile").getAsJsonObject().get("nickname").getAsString();
                    if (jsonObject.get("profile").getAsJsonObject().get("image") == null)
                        OppoImg = "undefined";
                    else
                        OppoImg = jsonObject.get("profile").getAsJsonObject().get("image").getAsString();
                    result.add(ResponseUserList.builder()
                            .opponent_id(opponent)
                            .opponent_image(OppoImg)
                            .opponent_nickname(OppoNick)
                            .content(v.getContent())
                            .createdAt(v.getCreatedAt())
                            .reservation_id(v.getReservation_id())
                            .build());
                }
                check.clear();
            } else if (type.equals("tattooist")) {
                for (MessageDto v : messageList) {
                    if (v.getSender().equals(user_id) && !v.getReceiver().equals(user_id)) { //내가 상대방한테 마지막으로 채팅을 보냈을때,
                        opponent = v.getReceiver();
                    } else if (!v.getSender().equals(user_id) && v.getReceiver().equals(user_id)) { //상대방이 나에게 마지막으로 채팅을 보냈을떄
                        opponent = v.getSender();
                    }
                    log.info("opponent : {}", opponent);
                    if (check.contains(v.getReservation_id()))
                        continue;
                    else
                        check.add(v.getReservation_id());

                    log.info("targetURL : {}", targetURL + "tattooist" );
                    String opponentInfo = getOpponentInfo.callAPIGet(targetURL , user_id, opponent,"tattooist");
                    JsonObject jsonObject = JsonParser.parseString(opponentInfo).getAsJsonObject();
                    OppoNick = jsonObject.get("profile").getAsJsonObject().get("nickname").getAsString();
                    if (jsonObject.get("profile").getAsJsonObject().get("image") == null)
                        OppoImg = "undefined";
                    else
                        OppoImg = jsonObject.get("profile").getAsJsonObject().get("image").getAsString();
                    result.add(ResponseUserList.builder()
                            .opponent_id(opponent)
                            .opponent_image(OppoImg)
                            .opponent_nickname(OppoNick)
                            .content(v.getContent())
                            .createdAt(v.getCreatedAt())
                            .reservation_id(v.getReservation_id())
                            .build());
                }
            }
            check.clear();
        } else {
            temp.addProperty("success", "fail");
            temp.addProperty("status", "Both type and user must be sended");
            HttpHeaders responseHeaders = new HttpHeaders();
            responseHeaders.add("Content-Type", "application/json; charset=UTF-8");
            return new ResponseEntity<>(gson.toJson(temp), responseHeaders,HttpStatus.OK);
        }

        temp.addProperty("success", "true");
        JsonArray jArray = new JsonArray();
        for (ResponseUserList v : result) {
            JsonObject vtmp = new JsonObject();
            vtmp.addProperty("content", v.getContent());
            vtmp.addProperty("createdAt", v.getCreatedAt());
            vtmp.addProperty("opponent_id", v.getOpponent_id());
            vtmp.addProperty("opponent_image", v.getOpponent_image());
            vtmp.addProperty("opponent_nickname", v.getOpponent_nickname());
            vtmp.addProperty("reservation_id", v.getReservation_id());
            jArray.add(vtmp);
        }
        temp.add("userlist", jArray);
        HttpHeaders responseHeaders = new HttpHeaders();
        responseHeaders.add("Content-Type", "application/json; charset=UTF-8");
        return new ResponseEntity<>(gson.toJson(temp), responseHeaders,HttpStatus.OK);
    }

    @GetMapping("/chat/message/{reservation_id}") // 채팅 내역 조회 요청 API
    public ResponseEntity getMessageList(@PathVariable String reservation_id, @RequestParam String subject_id) {
        //subject_id : 요청자의 id, reservation_id : 예약 id
        log.info("reservation_id : {}", reservation_id);
        log.info("subject_id : {}", subject_id);
        Gson gson = new Gson();
        JsonObject temp = new JsonObject();
        Iterable<MessageDto> messageList = messageService.getMessageList(reservation_id);


        temp.addProperty("success", "true");
        JsonArray jArray = new JsonArray();
        for (MessageDto e : messageList) {
            JsonObject vtmp = new JsonObject();
            boolean mine = false;
            if (e.getSender().equals(subject_id)) {
                mine = true;
            }
            vtmp.addProperty("id", e.getId());
            vtmp.addProperty("content", e.getContent());
            vtmp.addProperty("time", e.getCreatedAt());
            vtmp.addProperty("mine", mine);
            vtmp.addProperty("receiver", e.getReceiver());
            jArray.add(vtmp);
        }
        temp.add("messagelist", jArray);

        HttpHeaders responseHeaders = new HttpHeaders();
        responseHeaders.add("Content-Type", "application/json; charset=UTF-8");
        return new ResponseEntity<>(gson.toJson(temp), responseHeaders,HttpStatus.OK);
    }


}
