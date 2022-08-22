package com.allchat.allchatchatting.dto;


import com.allchat.allchatchatting.collection.Chat;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import reactor.util.annotation.NonNull;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Data
public class ChatNoticeDTO {

    private String participant;

    private Integer roomId;

    @NonNull
    private Boolean join;

    public Chat toEntity(){

        Chat chat ;

        if(this.join == true){

            chat = Chat.builder()
                    .msg(participant+"님이 입장하였습니다.")
                    .sender(null)
                    .roomId(roomId)
                    .participant(participant)
                    .build();

        }else{

            chat = Chat.builder()
                    .msg(participant+"님이 퇴장하셨습니다.")
                    .sender(null)
                    .roomId(roomId)
                    .participant(participant)
                    .build();
        }

        return chat;
    }
}
