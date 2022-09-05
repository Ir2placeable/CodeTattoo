package com.example.codetattoochat.dto;

import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@Data
public class MessageDto {
    private String sender;
    private String receiver;
    private String content;
    private LocalDateTime createdAt;

    @Builder
    public MessageDto(
            String sender,
            String receiver,
            String content,
            LocalDateTime createdAt
    ) {
        this.sender = sender;
        this.receiver = receiver;
        this.content = content;
        this.createdAt = createdAt;
    }
}
