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
    private Long id; // 메시지 id
    private String sender; // 메시지 발신자
    private String receiver; // 메시지 수신자
    private String content; // 메시지 내용
    private String createdAt; // 메시지 일자
    private String reservation_id; // 예약 id
    private Boolean is_image; // 이미지/텍스트 여부
    @Builder
    public MessageDto(
            Long id,
            String sender,
            String receiver,
            String content,
            String createdAt,
            String reservation_id,
            Boolean is_image
    ) {
        this.id = id;
        this.sender = sender;
        this.receiver = receiver;
        this.content = content;
        this.createdAt = createdAt;
        this.reservation_id = reservation_id;
        this.is_image = is_image;
    }
}
