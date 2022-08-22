package com.allchat.allchatchatting.controller;

import com.allchat.allchatchatting.collection.Chat;
import com.allchat.allchatchatting.dto.ChatAuthDTO;
import com.allchat.allchatchatting.dto.ChatDTO;
import com.allchat.allchatchatting.dto.ChatNoticeDTO;
import com.allchat.allchatchatting.handler.exception.CustomException;
import com.allchat.allchatchatting.service.ChatService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.server.reactive.ServerHttpRequest;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;
import reactor.core.scheduler.Schedulers;

@RequiredArgsConstructor
@RestController
public class ChatController {

    private final ChatService chatService;

    /**
     * 채팅방 메세지 불러오기
     */
    @GetMapping(value = "/chatRooms/{chatRoomId}/chats", produces = MediaType.TEXT_EVENT_STREAM_VALUE)
    public Flux<Chat> findByRoomId(@PathVariable Integer chatRoomId,
                                   @ModelAttribute ChatAuthDTO chatAuthDTO,
                                   ServerHttpRequest request){

        //jwt - claims 값
        String username = request.getHeaders().getFirst("username");

        //권한체크
        if(!username.equals(chatAuthDTO.getUsername())){
            throw new CustomException("채팅방 메세지 조회 권한이 없습니다.");
        }

        return chatService.chatList(chatRoomId, chatAuthDTO.getJoinDateTime())
                .subscribeOn(Schedulers.boundedElastic());
    }

    /**
     * 메세지 저장
     */
    @PostMapping("/chats")
    public Mono<Chat> saveMessage(@RequestBody ChatDTO chatDTO, ServerHttpRequest request) {

        //jwt - claims 값
        String username = request.getHeaders().getFirst("username");

        //권한체크
        if(!username.equals(chatDTO.getSender())){
            throw new CustomException("메세지 작성 권한이 없습니다.");
        }

        return chatService.saveMessage(chatDTO);
    }

    /**
     * 방참여,나가기 메시지 저장
     */
    @PostMapping("/chats/notifications")
    public Mono<Chat> saveNoticeMessage(@RequestBody ChatNoticeDTO chatNoticeDTO) {

        return chatService.saveNoticeMessage(chatNoticeDTO);
    }
}
