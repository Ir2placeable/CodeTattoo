package com.example.codetattoochat.vo;

import lombok.Data;
import lombok.Getter;

import javax.validation.constraints.NotNull;

@Getter
@Data
public class RequestReserveDelete {
    @NotNull(message="Sender cannot be null")
    private String user_id;

    @NotNull(message="Receiver cannot be null")
    private String tattooist_id;

    @NotNull(message="Reservation_id cannot be null")
    private String reservation_id;
}
