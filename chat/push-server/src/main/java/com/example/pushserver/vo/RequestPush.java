package com.example.pushserver.vo;

import lombok.Data;
import lombok.Getter;
import javax.validation.constraints.NotNull;

@Getter
@Data
public class RequestPush {
    @NotNull(message = "User_id cannot be null")
    private String user_id;

    @NotNull(message="Tattooist_id cannot be null")
    private String tattooist_id;

    @NotNull(message="User_kakao cannot be null")
    private String user_kakao;

    @NotNull(message="Tattooist_kakao cannot be null")
    private String tattooist_kakao;
}


