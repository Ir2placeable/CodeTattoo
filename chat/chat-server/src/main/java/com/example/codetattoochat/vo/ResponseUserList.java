package com.example.codetattoochat.vo;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
public class ResponseUserList {
    private Long id;
    private String sender;
    private String receiver;
    private String content;
    private String createdAt;

    private String opponent;
    @Builder
    public ResponseUserList(
            Long id,
            String sender,
            String receiver,
            String content,
            String createdAt,
            String opponent
    ) {
        this.id = id;
        this.sender = sender;
        this.receiver = receiver;
        this.content = content;
        this.createdAt = createdAt;
        this.opponent = opponent;
    }

}
