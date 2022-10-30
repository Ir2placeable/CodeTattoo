package com.example.pushserver.vo;

import lombok.Data;
import lombok.Getter;

import javax.validation.constraints.NotNull;

@Getter
@Data
public class RequestLogin {

    @NotNull(message = "id cannot be null")
    private String id;

    @NotNull(message="Fcm cannot be null")
    private String fcm;

}
