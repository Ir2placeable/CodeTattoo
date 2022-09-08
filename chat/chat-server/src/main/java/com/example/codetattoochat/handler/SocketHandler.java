package com.example.codetattoochat.handler;

import com.example.codetattoochat.config.WebSocketConfig;
import lombok.Data;
import lombok.Getter;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

@Component
@Slf4j
@Data
@Getter
public class SocketHandler extends TextWebSocketHandler {

    WebSocketSession currentSession;

    HashMap<String, WebSocketSession> sessionMap = new HashMap<>(); //웹소켓 세션을 담아둘 맵
    HashMap<String, String> userMap = new HashMap<>(); //세션과 유저를 매핑할 맵


    @Override
    public void handleTextMessage(WebSocketSession session, TextMessage message) {

        // 메시지 발송, 메시지를 수신하면 실행
        // 상속받은 TextWebSocketHandler는 handleTextMessage를 실행시키며,
        // 메시지 타입에따라 handleBinaryMessage또는 handleTextMessage가 실행
        String msg = message.getPayload();
        log.info("Session : {}, message : {}", session, message);
        for (String key : sessionMap.keySet()) {
            WebSocketSession wss = sessionMap.get(key);
            try {
                wss.sendMessage(new TextMessage(msg));
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
    }

    @Override
    public void afterConnectionEstablished(WebSocketSession session) throws Exception {
        // 소켓 연결, 웹소켓 연결이 되면 동작
        super.afterConnectionEstablished(session);
        currentUserSession(session);
        log.info("Session Connected : {}", session);
        sessionMap.put(session.getId(), session);
    }

    @Override
    public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws  Exception {
        // 소켓 종료, 소켓이 종료되면 동작
        sessionMap.remove(session.getId());
        userMap.values().remove(session.getId());
        log.info("CurrentSession Closed Complete : {}", userMap);
        super.afterConnectionClosed(session, status);
        log.info("Session Closed : {}", session);
    }

    private void currentUserSession(WebSocketSession session) throws InterruptedException {
        this.currentSession = session;
        log.info("CurrentSession Update Complete : {}", this.currentSession);
    }

    public Boolean currentUserid(String userId) {
        if (this.currentSession != null)
            userMap.put(userId, this.currentSession.getId());
        else
            return false;
        return true;
    }
}
