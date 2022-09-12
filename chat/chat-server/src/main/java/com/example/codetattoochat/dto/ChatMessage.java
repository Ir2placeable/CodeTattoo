package com.example.codetattoochat.dto;

import lombok.Data;

@Data
public class ChatMessage {
    private String sender;
    private String receiver;
    private String content;
    private String created_at;
    private String reservation_id;
    private Boolean enter_room;
}
