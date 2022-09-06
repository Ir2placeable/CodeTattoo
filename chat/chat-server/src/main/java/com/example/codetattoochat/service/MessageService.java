package com.example.codetattoochat.service;

import com.example.codetattoochat.dto.MessageDto;

public interface MessageService {
    Iterable<MessageDto> getUserList(String sender);

    Iterable<MessageDto> getMessageList(String sender, String receiver);

}
