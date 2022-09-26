package com.codetattoo.notiserver.firebase;

import com.google.firebase.messaging.Message;
import com.google.firebase.messaging.Notification;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Builder
@AllArgsConstructor
@Getter
public class FCMMessage {
    private boolean validate_Only; 
    private Message message;

    @Builder
    @AllArgsConstructor
    @Getter
    public static class Message {
        private Notification notification; // 노티 내부 정보
        private String token; // FCM으로 부터 발급 받은 토큰
    }

    @Builder
    @AllArgsConstructor
    @Getter
    public static class Notification {
        private String title; // 푸쉬 메시지 이름
        private String body; // 푸쉬 메시지 내용
        private String image; // 푸쉬 메시지 이미지
    }
}
