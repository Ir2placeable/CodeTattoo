package com.allchat.allchatchatting.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.Date;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Data
public class AuthFilterDTO {

    private String timestamp;

    private Integer status;

    private String error;

    private String message;

    private String path;
}
