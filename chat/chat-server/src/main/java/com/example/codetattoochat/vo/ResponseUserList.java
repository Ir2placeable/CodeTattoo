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
    private Boolean confirmed;
    private Boolean is_image;

    @Builder
    public ResponseUserList(
            Long id, // 유저 id
            String sender, // 발송자
            String receiver, // 수신자
            String content, // 내용
            String createdAt, // 언제 보냈는가
            String opponent_id, // 자신이 아닌 상대방 id
            String opponent_image, // 자신이 아닌 상대방 image
            String opponent_nickname, // 자신이 아닌 상대방 닉네임
            String reservation_id, // 예약 id
            Boolean confirmed, // 예약 확정 정보
            Boolean is_image// image여부
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
        this.confirmed = confirmed;
        this.is_image = is_image;
    }
}
