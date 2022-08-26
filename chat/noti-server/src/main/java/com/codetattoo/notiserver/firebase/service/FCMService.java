package com.codetattoo.notiserver.firebase.service;

import com.codetattoo.notiserver.firebase.FCMMessage;
import com.codetattoo.notiserver.firebase.FCMinitializer;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import okhttp3.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.stereotype.Component;

import java.io.IOException;

@Component
@RequiredArgsConstructor
@Slf4j
public class FCMService {

    private static final Logger logger = LoggerFactory.getLogger(FCMinitializer.class);
    private final String API_URL = "https://fcm.googleapis.com/v1/projects/codetattoo-39f94/messages:send";
    private final ObjectMapper objectMapper;

    @Autowired
    FCMinitializer fcMinitializer;

    public void sendMessageTo(String targetToken, String title, String body) throws IOException {
        String message = makeMessage(targetToken, title, body);
        OkHttpClient client = new OkHttpClient();
        RequestBody requestBody = RequestBody.create(message, MediaType.get("application/json; charset=utf-8"));
        Request request = new Request.Builder()
                .url(API_URL)
                .post(requestBody)
                .addHeader(HttpHeaders.AUTHORIZATION, "Bearer " + fcMinitializer.getAccessToken())
                .build();

        try {
            Response response = client.newCall(request).execute();
            log.debug("response : {}", response.body().toString());
        } catch (Exception e) {
            e.printStackTrace();
            log.debug("error : {}", e);
        }
    }

    private String makeMessage(String targetToken, String title, String body) throws JsonProcessingException, JsonProcessingException {
        FCMMessage fcmMessage = FCMMessage.builder()
                .message(FCMMessage.Message.builder()
                        .token(targetToken)
                        .notification(FCMMessage.Notification.builder()
                                .title(title)
                                .body(body)
                                .image(null)
                                .build()
                        )
                        .build()
                )
                .validate_Only(false)
                .build();
        return objectMapper.writeValueAsString(fcmMessage);
    }
}
