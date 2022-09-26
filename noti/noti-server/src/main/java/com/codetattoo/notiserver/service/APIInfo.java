package com.codetattoo.notiserver.service;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

// 서버 상태 정보 확인 클래스
@Getter
@Setter
@Builder
public class APIInfo {
    private String app;
    private String ver;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss", timezone = "Asia/Seoul")
    private LocalDateTime timestamp;
}
