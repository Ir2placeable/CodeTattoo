package com.allchat.allchatchatting.service;

import com.allchat.allchatchatting.collection.Chat;
import com.allchat.allchatchatting.collection.ChatRepository;
import com.allchat.allchatchatting.dto.ChatDTO;
import com.allchat.allchatchatting.dto.ChatNoticeDTO;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.time.LocalDateTime;

@Log4j2
@RequiredArgsConstructor
@Service
public class ChatService {

    private final ChatRepository chatRepository;

    /**
     * 채팅방 메세지 불러오기
     */
    public Flux<Chat> chatList(Integer chatRoomId, LocalDateTime joinDateTime){

        //참여한 시간 이후 데이터 출력
       return chatRepository.mFindByRoomId(chatRoomId, joinDateTime);
    }


    /**
     * 메세지 저장
     */
    public Mono<Chat> saveMessage(ChatDTO chatDTO){

        Chat chat = chatDTO.toEntity();

        log.info("메세지 저장 : db save 전");
        System.out.println("메세지 저장 : db save 전");
        return chatRepository.save(chat);
    }

    /**
     * 방 참여 메세지 저장
     */
    public Mono<Chat> saveNoticeMessage(ChatNoticeDTO chatNoticeDTO){

        Chat chat = chatNoticeDTO.toEntity();

        return chatRepository.save(chat);
    }

}
