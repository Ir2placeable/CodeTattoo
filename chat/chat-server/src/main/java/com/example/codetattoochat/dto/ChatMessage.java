package com.example.codetattoochat.dto;

import lombok.Data;

@Data
public class ChatMessage {
    private Boolean is_image; // 이미지/텍스트 여부
    private String sender; // 메시지 발신자
    private String receiver; // 메시지 수신자
    private String content; // 메시지 내용
    private String created_at; // 메시지 일자
    private String reservation_id; // 예약 id
    private Boolean enter_room; // 처음 채팅방에 입장했는지 안했는지를 표기하기 위한 Boolean값
}
