package com.example.codetattoochat.vo;

import lombok.Getter;

import javax.validation.constraints.NotNull;

@Getter
public class RequestUserId {
    @NotNull(message="UserId cannot be null")
    private String userid; // 현재 접속한 유저의 id
}
