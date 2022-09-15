package com.example.codetattoochat.controller;

import org.springframework.boot.web.servlet.error.ErrorController;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

// ErrorController로, WHITE LABEL PAGE를 회피하기 위함으로 작성
@Controller
public class CustomErrorController implements ErrorController {
    @RequestMapping("/error")
    public String handleError() {
        return "/public/index.html";
    }

}
