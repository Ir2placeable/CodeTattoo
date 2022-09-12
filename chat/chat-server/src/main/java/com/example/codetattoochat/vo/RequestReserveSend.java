package com.example.codetattoochat.vo;

import lombok.Getter;

import javax.validation.constraints.NotNull;

@Getter
public class RequestReserveSend {

    @NotNull(message="Sender cannot be null")
    private String user_id;

    @NotNull(message="Receiver cannot be null")
    private String tattooist_id;

    @NotNull(message="Reservation_id cannot be null")
    private String reservation_id;
}
