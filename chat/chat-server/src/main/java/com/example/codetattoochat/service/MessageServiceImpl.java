package com.example.codetattoochat.service;

import com.example.codetattoochat.dto.MessageDto;
import com.example.codetattoochat.entity.MessageEntity;
import com.example.codetattoochat.repository.MessageRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;

@Service
@Slf4j
public class MessageServiceImpl implements MessageService {
    private MessageRepository messageRepository;

    @Autowired
    public MessageServiceImpl(MessageRepository messageRepository) {
        this.messageRepository = messageRepository;
    }

    // 메시지를 RDS MariaDB에 저장하기 위한 함수
    @Transactional
    @Override
    public MessageDto send(MessageDto dto) {
        log.info("Message Service's Service Layer :: Call send Method!");

        MessageEntity messageEntity = MessageEntity.builder()
                .sender(dto.getSender())
                .receiver(dto.getReceiver())
                .content(dto.getContent())
                .created_At(dto.getCreatedAt())
                .reservation_id(dto.getReservation_id())
                .is_image(dto.getIs_image())
                .build();

        log.info("Message is {}", messageEntity);
        messageRepository.save(messageEntity);
//        messageRepository.save(messageEntity);

        return MessageDto.builder()
                .sender(dto.getSender())
                .receiver(dto.getReceiver())
                .content(dto.getContent())
                .reservation_id(dto.getReservation_id())
                .is_image(dto.getIs_image())
                .build();
    }

    // 예약 삭제 요청이 들어왔을 경우 RDS MariaDB에서 reservation_id를 기준으로 데이터 삭제
    @Transactional
    @Override
    public Boolean delete(String reservation_id) {
        log.info("Message Service's Service Layer :: Call delete Method!");

        messageRepository.delete(reservation_id);

        return true;
    }

    // S3 버킷에 올려진 채팅방 내 이미지를 삭제하기 위하여 필요한 url 리스트 쿼리문
    // url에 key값이 존재하기 때문
    @Transactional
    @Override
    public Iterable<String> getUrlList(String reservation_id) {
        log.info("Message Service's Service Layer :: Call getUrlList Method!");

        Iterable<String> urlList = messageRepository.findUrlList(reservation_id);

        return urlList;
    }

    // 채팅방 내 채팅방 리스트를 쿼리하기 위한 함수
    // Iterable<Object>로 반환
    @Transactional
    @Override
    public Iterable<MessageDto> getUserList(String sender) {
        log.info("Message Service's Service Layer :: Call getUserList Method!");

        Iterable<Object[]> messageList = messageRepository.findUserList(sender);
        List<MessageDto> messages = new ArrayList<>();

        messageList.forEach(message -> {
            messages.add(MessageDto.builder()
                    .sender(String.valueOf(message[0]))
                    .receiver(String.valueOf(message[1]))
                    .content(String.valueOf(message[2]))
                    .createdAt(String.valueOf(message[3]))
                            .reservation_id(String.valueOf(message[4]))
                    .build());
        });

        return messages;
    }

    // 각 채팅방 내의 메시지 내역을 가져오기 위한 함수
    @Transactional
    @Override
    public Iterable<MessageDto> getMessageList(String reservation_id) {
        log.info("Message Service's Service Layer :: Call getMessageList Method!");
        Iterable<MessageEntity> messageList = messageRepository.findMessageList(reservation_id);
        List<MessageDto> messages = new ArrayList<>();

        messageList.forEach(message -> {
            messages.add(MessageDto.builder()
                    .id(message.getId())
                    .sender(message.getSender())
                    .receiver(message.getReceiver())
                    .content(message.getContent())
                    .createdAt(message.getCreated_At())
                    .reservation_id(message.getReservation_id())
                            .is_image(message.getIs_image())
                    .build());
        });

        return messages;
    }
}
