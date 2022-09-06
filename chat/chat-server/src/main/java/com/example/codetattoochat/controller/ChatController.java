package com.example.codetattoochat.controller;

import com.example.codetattoochat.dto.MessageDto;
import com.example.codetattoochat.service.APIInfo;
import com.example.codetattoochat.service.MessageService;
import com.example.codetattoochat.service.GetOpponentInfo;
import com.example.codetattoochat.vo.ResponseUserList;
import com.google.gson.Gson;
import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import java.net.URISyntaxException;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;


@Controller
@RestController
@Slf4j
public class ChatController {
    private MessageService messageService;
    private Environment env;
    final String url = "http://3.39.196.91:3001";
    final String endpoint = "/chatting/profile/";

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


    @RequestMapping("/chat")
    public ModelAndView chat() {
        ModelAndView mv = new ModelAndView();
        mv.setViewName("chat");
        return mv;
    }

    @GetMapping("/ping")
    public APIInfo ping() {
        APIInfo info = APIInfo.builder().app("CodeTattoo-Chat").ver("1.0").timestamp(LocalDateTime.now()).build();
        return info;
    }

    @GetMapping("/chat/userlist/{type}/{user_id}") // 상대방 유저 리스트 요청 API,
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
                return new ResponseEntity<>(gson.toJson(temp), HttpStatus.OK);
            }

            if (type.equals("user")) {
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
                    log.info("targetURL : {}", targetURL + "tattooist" + "/" + opponent);
                    String opponentInfo = getOpponentInfo.callAPIGet(targetURL + "tattooist" + "/" + opponent);
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
            } else if (type.equals("tattooist")) {
                for (MessageDto v : messageList) {
                    if (v.getSender().equals(user_id) && !v.getReceiver().equals(user_id)) { //내가 상대방한테 마지막으로 채팅을 보냈을때,
                        opponent = v.getReceiver();
                    } else if (!v.getSender().equals(user_id) && v.getReceiver().equals(user_id)) { //상대방이 나에게 마지막으로 채팅을 보냈을떄
                        opponent = v.getSender();
                    }
                    log.info("opponent : {}", opponent);
                    if (check.contains(opponent))
                        continue;
                    else
                        check.add(opponent);

                    log.info("targetURL : {}", targetURL + "user" + "/" + opponent);
                    String opponentInfo = getOpponentInfo.callAPIGet(targetURL + "user" + "/" + opponent);
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
            }
            check.clear();
        } else {
            temp.addProperty("success", "fail");
            temp.addProperty("status", "Both type and user must be sended");
            return new ResponseEntity<>(gson.toJson(temp), HttpStatus.OK);
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
            jArray.add(vtmp);
        }
        temp.add("userlist", jArray);
        return new ResponseEntity<>(gson.toJson(temp), HttpStatus.OK);
    }

}
