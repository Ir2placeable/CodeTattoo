package com.example.codetattoochat.service;

import com.example.codetattoochat.dto.MessageDto;
import com.example.codetattoochat.repository.MessageRepository;
import lombok.extern.slf4j.Slf4j;
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
    public Iterable<MessageDto> getUserList(String sender) {
        log.info("Message Service's Service Layer :: Call getUserList Method!");

        Iterable<Object[]> messageList = messageRepository.findUserList(sender);
        List<MessageDto> messages = new ArrayList<>();

        for (Object[] e : messageList) {
            System.out.println("e = " + Arrays.toString(e));
        }

        messageList.forEach(message -> {
            messages.add(MessageDto.builder()
                    .sender(String.valueOf(message[0]))
                    .receiver(String.valueOf(message[1]))
                            .content(String.valueOf(message[2]))
                            .createdAt(String.valueOf(message[3]))
                    .build());
        });

        return messages;
    }
}