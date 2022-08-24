package com.allchat.allchatchatting.dto;

import com.allchat.allchatchatting.collection.Chat;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Data
public class ChatDTO {

    private String msg;

    private String sender;

    private Integer roomId;

    public Chat toEntity(){

        Chat chat = Chat.builder()
                .msg(msg)
                .sender(sender)
                .roomId(roomId)
                .build();

        return chat;
    }
}
