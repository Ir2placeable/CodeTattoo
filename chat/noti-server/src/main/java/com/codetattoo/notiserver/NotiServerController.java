package com.codetattoo.notiserver;

import com.codetattoo.notiserver.service.APIInfo;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDateTime;

@Slf4j
@RestController
public class NotiServerController {

    @GetMapping("/ping")
    public APIInfo ping() {
        APIInfo info = APIInfo.builder().app("CodeTattoo-NotiServer").ver("1.0").timestamp(LocalDateTime.now()).build();
        return info;
    }


}
