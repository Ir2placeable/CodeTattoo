package com.example.codetattoochat.service;

import com.example.codetattoochat.dto.MessageDto;
import org.aspectj.bridge.Message;

public interface MessageService {
    MessageDto send(MessageDto dto);

    Iterable<MessageDto> getUserList(String sender);

    Iterable<MessageDto> getMessageList(String sender, String receiver);

}
