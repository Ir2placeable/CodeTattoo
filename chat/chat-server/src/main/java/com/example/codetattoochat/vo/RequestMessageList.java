package com.example.codetattoochat.vo;

import lombok.Getter;

import javax.validation.constraints.NotNull;

@Getter
public class RequestMessageList {
    @NotNull(message="Sender cannot be null")
    private String sender;

    @NotNull(message="Receiver cannot be null")
    private String receiver;

}