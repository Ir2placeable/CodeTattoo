package com.example.codetattoochat.service;

import com.example.codetattoochat.dto.MessageDto;
import com.example.codetattoochat.entity.MessageEntity;
import com.example.codetattoochat.repository.MessageRepository;
import lombok.extern.slf4j.Slf4j;
import org.aspectj.bridge.Message;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Service
@Slf4j
public class MessageServiceImpl implements MessageService {
    private MessageRepository messageRepository;

    @Autowired
    public MessageServiceImpl(MessageRepository messageRepository) {
        this.messageRepository = messageRepository;
    }

    @Transactional
    @Override
    public MessageDto send(MessageDto dto) {
        log.info("Message Service's Service Layer :: Call send Method!");

        MessageEntity messageEntity = MessageEntity.builder()
                .sender(dto.getSender())
                .receiver(dto.getReceiver())
                .content(dto.getContent())
                .created_At(String.valueOf(LocalDateTime.now()))
                .reservation_id(dto.getReservation_id())
                .build();

        log.info("Message is {}", messageEntity);
        messageRepository.save(messageEntity);
//        messageRepository.save(messageEntity);

        return MessageDto.builder()
                .sender(dto.getSender())
                .receiver(dto.getReceiver())
                .content(dto.getContent())
                .reservation_id(dto.getReservation_id())
                .build();
    }

    @Transactional
    @Override
    public Iterable<MessageDto> getUserList(String sender) {
        log.info("Message Service's Service Layer :: Call getUserList Method!");

        Iterable<Object[]> messageList = messageRepository.findUserList(sender);
        List<MessageDto> messages = new ArrayList<>();

//        for (Object[] e : messageList) {
//            System.out.println("e = " + Arrays.toString(e));
//        }

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
                    .build());
        });

        return messages;
    }
}
