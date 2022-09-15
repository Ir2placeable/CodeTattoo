package com.example.codetattoochat.service;

import com.example.codetattoochat.dto.MessageDto;
import org.aspectj.bridge.Message;

// ServiceLayer
public interface MessageService {
    MessageDto send(MessageDto dto);
    Boolean delete(String reservation_id);

    Iterable<String> getUrlList(String reservation_id);

    Iterable<MessageDto> getUserList(String sender);

    Iterable<MessageDto> getMessageList(String reservation_id);


}
