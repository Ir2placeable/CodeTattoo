package com.example.codetattoochat.vo;

import lombok.Getter;
import javax.validation.constraints.NotNull;

@Getter
public class RequestSend {
    @NotNull(message="Sender cannot be null")
    private String sender;

    @NotNull(message="Receiver cannot be null")
    private String receiver;

    @NotNull(message="Content cannot be null")
    private String content;

    @NotNull(message="Created_at cannot be null")
    private String created_at;

    @NotNull(message="Reservation_id cannot be null")
    private String reservation_id;
}