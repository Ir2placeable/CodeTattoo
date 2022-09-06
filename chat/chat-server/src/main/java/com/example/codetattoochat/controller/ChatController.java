package com.example.codetattoochat.controller;

import com.example.codetattoochat.dto.MessageDto;
import com.example.codetattoochat.service.APIInfo;
import com.example.codetattoochat.service.MessageService;
import com.example.codetattoochat.vo.ResponseMessage;
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

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;


@Controller
@RestController
@Slf4j
public class ChatController {
    private MessageService messageService;
    private Environment env;

    @Autowired
    public ChatController(
            MessageService messageService,
            Environment env
    ) {
        this.messageService = messageService;
        this.env = env;
    }

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

    @GetMapping("/chat/userlist/{user}")
    public ResponseEntity getUserList(@PathVariable String user) {
        log.info("UserList is : {}", user);
        Iterable<MessageDto> messageList = messageService.getUserList(user);
        log.info("{} 's messageList is : {}", user, messageList);
        List<ResponseMessage> result = new ArrayList<>();

        messageList.forEach(v -> {
            result.add(ResponseMessage.builder()
                    .sender(v.getSender())
                    .receiver(v.getReceiver())
                    .build()
            );
        });

        return ResponseEntity.status(HttpStatus.OK).body(result);
    }
}
