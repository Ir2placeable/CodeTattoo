package com.example.codetattoochat.vo;

import lombok.Getter;

import javax.validation.constraints.NotNull;

@Getter
public class RequestReserveSend {

    @NotNull(message="Sender cannot be null")
    private String user_id; // 예약에 속한 유저 id

    @NotNull(message="Receiver cannot be null")
    private String tattooist_id; // 예약에 속한 타투이스트 id

    @NotNull(message="Reservation_id cannot be null")
    private String reservation_id; // 예약id
}
