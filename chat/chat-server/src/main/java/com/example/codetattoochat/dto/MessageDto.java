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
    private Long id;
    private String sender;
    private String receiver;
    private String content;
    private String createdAt;

    @Builder
    public MessageDto(
            Long id,
            String sender,
            String receiver,
            String content,
            String createdAt
    ) {
        this.id = id;
        this.sender = sender;
        this.receiver = receiver;
        this.content = content;
        this.createdAt = createdAt;
    }
}
