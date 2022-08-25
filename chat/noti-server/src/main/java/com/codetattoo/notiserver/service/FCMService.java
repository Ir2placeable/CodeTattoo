package com.codetattoo.notiserver.service;

import com.codetattoo.notiserver.firebase.FCMinitializer;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import okhttp3.OkHttpClient;
import okhttp3.RequestBody;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

import java.io.IOException;

@Component
@RequiredArgsConstructor
public class FCMService {

    private static final Logger logger = LoggerFactory.getLogger(FCMinitializer.class);
    private final String API_URL = "https://fcm.googleapis.com/v1/projects/codetattoo-39f94/messages:send";
    private final ObjectMapper objectMapper;

    public void sendMessageTo(String targetToken, String title, String body) throws IOException {
        String message = makeMessage(targetToken, title, body);
        OkHttpClient client = new OkHttpClient();
//        RequestBody requestBody = RequestBody.create(message) 2022.08.25 작성
    }

//    public void send(final NotificationRequest notificationRequest) {} 2022.08.22 작성
}
