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
    private String opponent_id;
    private String opponent_image;
    private String opponent_nickname;
    private String reservation_id;
    @Builder
    public ResponseUserList(
            Long id,
            String sender,
            String receiver,
            String content,
            String createdAt,
            String opponent_id,
            String opponent_image,
            String opponent_nickname,
            String reservation_id
    ) {
        this.id = id;
        this.sender = sender;
        this.receiver = receiver;
        this.content = content;
        this.createdAt = createdAt;
        this.opponent_id = opponent_id;
        this.opponent_image = opponent_image;
        this.opponent_nickname = opponent_nickname;
        this.reservation_id = reservation_id;
    }

}
