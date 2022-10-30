package com.example.pushserver.Service;

import com.example.pushserver.vo.FCMMessage;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.firebase.messaging.FirebaseMessaging;
import com.google.firebase.messaging.FirebaseMessagingException;
import com.google.firebase.messaging.Message;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import okhttp3.*;
import org.json.JSONObject;
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
    private final String API_URL = "https://fcm.googleapis.com/v1/projects//messages:send";
    private final ObjectMapper objectMapper;

    @Autowired
    FCMinitializer fcMinitializer;

    public void sendMessageTo(String targetToken, String title, String body) throws IOException {
        String message = makeMessage(targetToken, title, body);
        log.info("request : {}", message);
        OkHttpClient client = new OkHttpClient();
        RequestBody requestBody = RequestBody.create(message, MediaType.get("application/json; charset=utf-8"));
        Request request = new Request.Builder()
                .url(API_URL)
                .post(requestBody)
                .addHeader(HttpHeaders.AUTHORIZATION, "Bearer " + fcMinitializer.getAccessToken())
                .addHeader(HttpHeaders.CONTENT_TYPE, "application/json; UTF-8")
                .build();

        try {
            Response response = client.newCall(request).execute();
            log.info("response : {}", response);
        } catch (Exception e) {
            e.printStackTrace();
            log.info("error : {}", e);
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
//                .validate_Only(false)
                .build();

        return objectMapper.writeValueAsString(fcmMessage);
    }

    public void sendpush(String targetToken, String body) throws FirebaseMessagingException {
        // This registration token comes from the client FCM SDKs.
        String registrationToken = "YOUR_REGISTRATION_TOKEN";

    // See documentation on defining a message payload.
        Message message = Message.builder()
                .putData("topic", body)
                .setToken(targetToken)
                .build();

// Send a message to the device corresponding to the provided
// registration token.
        String response = FirebaseMessaging.getInstance().send(message);
// Response is a message ID string.
        System.out.println("Successfully sent message: " + response);
    }
}
