package com.example.pushserver.Service;

import com.example.pushserver.Dto.DefaultMessageDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

// 예약 확정, 작업 시작, 작업 종료, 새로운 경매 입찰시 메시지 전송 필요
@Service
public class CustomMessageService {

    @Autowired
    MessageService messageService;

    public boolean sendMyMessage() {
        DefaultMessageDto myMsg = new DefaultMessageDto();
        myMsg.setBtnTitle("자세히보기");
        myMsg.setMobileUrl("");
        myMsg.setObjType("text");
        myMsg.setWebUrl("");
        myMsg.setText("메시지 테스트입니다.");

        String accessToken = AuthService.authToken;

        return messageService.sendMessage(accessToken, myMsg);
    }

    public boolean sendReservationMessage() {
        DefaultMessageDto myMsg = new DefaultMessageDto();
        myMsg.setBtnTitle("자세히보기");
        myMsg.setMobileUrl("");
        myMsg.setObjType("text");
        myMsg.setWebUrl("");
        myMsg.setText("예약 확정 되었습니다.");

        String accessToken = AuthService.authToken;

        return messageService.sendMessage(accessToken, myMsg);
    }

    public boolean sendWorkStartMessage() {
        DefaultMessageDto myMsg = new DefaultMessageDto();
        myMsg.setBtnTitle("자세히보기");
        myMsg.setMobileUrl("");
        myMsg.setObjType("text");
        myMsg.setWebUrl("");
        myMsg.setText("작업이 시작되었습니다.");

        String accessToken = AuthService.authToken;

        return messageService.sendMessage(accessToken, myMsg);
    }

    public boolean sendWorkFinishMessage() {
        DefaultMessageDto myMsg = new DefaultMessageDto();
        myMsg.setBtnTitle("자세히보기");
        myMsg.setMobileUrl("");
        myMsg.setObjType("text");
        myMsg.setWebUrl("");
        myMsg.setText("작업이 완료되었습니다.");

        String accessToken = AuthService.authToken;

        return messageService.sendMessage(accessToken, myMsg);
    }

    public boolean sendAuctionMessage() {
        DefaultMessageDto myMsg = new DefaultMessageDto();
        myMsg.setBtnTitle("자세히보기");
        myMsg.setMobileUrl("");
        myMsg.setObjType("text");
        myMsg.setWebUrl("");
        myMsg.setText("경매 입찰 완료되었습니다.");

        String accessToken = AuthService.authToken;

        return messageService.sendMessage(accessToken, myMsg);
    }
}