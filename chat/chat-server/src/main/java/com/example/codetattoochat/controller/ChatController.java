package com.example.codetattoochat.controller;

import com.example.codetattoochat.service.APIInfo;
import com.example.codetattoochat.vo.ResponseMessage;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;


@Controller
@RestController
@Slf4j
public class ChatController {

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

    @GetMapping("/chat/userlist/{sender}")
    public ResponseEntity getUserList(@PathVariable String sender) {
        log.debug("UserList sender : {}", sender);
        List<ResponseMessage> result = new ArrayList<>();
        return ResponseEntity.status(HttpStatus.OK).body(result);
    }
}
