package com.example.codetattoochat.vo;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
public class ResponseMessage {
    private Long id;
    private String sender;
    private String receiver;
    private String content;
    private LocalDateTime createdAt;

    @Builder
    public ResponseMessage(
            Long id,
            String sender,
            String receiver,
            String content,
            LocalDateTime createdAt
    ) {
        this.id = id;
        this.sender = sender;
        this.receiver = receiver;
        this.content = content;
        this.createdAt = createdAt;
    }

}
