package com.example.codetattoochat.vo;

import lombok.Getter;

import javax.validation.constraints.NotNull;

@Getter
public class RequestMessageList {
    @NotNull(message="Sender cannot be null")
    private String sender; // 메시지 발신자

    @NotNull(message="Receiver cannot be null")
    private String receiver; // 메시지 수신자

}
