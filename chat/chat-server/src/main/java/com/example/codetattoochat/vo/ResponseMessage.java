package com.example.codetattoochat.vo;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
public class ResponseMessage {
    private Long id; // 메시지 id
    private String sender; // 메시지 발송자
    private String receiver; // 메시지 수신자
    private String content; // 메시지 내용
    private LocalDateTime createdAt; // 메시지 일자

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
