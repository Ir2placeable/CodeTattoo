package com.example.codetattoochat.vo;

import lombok.Getter;
import javax.validation.constraints.NotNull;

@Getter
public class RequestSend {
    @NotNull(message="Sender cannot be null")
    private String sender; // 메시지 발신자

    @NotNull(message="Receiver cannot be null")
    private String receiver; // 메시지 수신자

    @NotNull(message="Content cannot be null")
    private String content; // 메시지 내용

    @NotNull(message="Created_at cannot be null")
    private String created_at; // 메시지 일자

    @NotNull(message="Reservation_id cannot be null")
    private String reservation_id; // 예약 id

    @NotNull(message="Is_image cannot be null")
    private Boolean is_image; // image인지 text인지

    private String image; // 이미지일 경우, base64 인코딩 텍스트
    private String mime; // 이미지일 경우, 파일 형식
}