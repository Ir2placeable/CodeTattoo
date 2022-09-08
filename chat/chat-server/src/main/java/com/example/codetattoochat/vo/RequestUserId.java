package com.example.codetattoochat.vo;

import lombok.Getter;

import javax.validation.constraints.NotNull;

@Getter
public class RequestUserId {
    @NotNull(message="UserId cannot be null")
    private String userid;
}
