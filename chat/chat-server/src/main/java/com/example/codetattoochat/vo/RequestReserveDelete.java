package com.example.codetattoochat.vo;

import lombok.Data;
import lombok.Getter;

import javax.validation.constraints.NotNull;

@Getter
@Data
public class RequestReserveDelete {
    @NotNull(message="Sender cannot be null")
    private String user_id; // 예약에 속한 유저 Id

    @NotNull(message="Receiver cannot be null")
    private String tattooist_id; // 예약에 속한 타투이스트 id

    @NotNull(message="Reservation_id cannot be null")
    private String reservation_id; // 예약id
}
