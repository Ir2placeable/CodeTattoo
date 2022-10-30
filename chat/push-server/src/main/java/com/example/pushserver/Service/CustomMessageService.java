package com.example.pushserver.Service;

import com.example.pushserver.Dto.DefaultMessageDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

// 예약 확정, 작업 시작, 작업 종료, 새로운 경매 입찰시 메시지 전송 필요
@Service
public class CustomMessageService {

    @Autowired
    MessageService messageService;

    public boolean sendTestMessage() {
        DefaultMessageDto myMsg = new DefaultMessageDto();
        myMsg.setBtnTitle("자세히보기");
        myMsg.setMobileUrl("");
        myMsg.setObjType("text");
        myMsg.setWebUrl("");
        myMsg.setText("메시지 테스트입니다.");

        String accessToken = AuthService.authToken;

        return messageService.sendMessage(accessToken, myMsg);
    }

    public boolean sendTestFriendMessage(String target) {
        DefaultMessageDto myMsg = new DefaultMessageDto();
        myMsg.setReceiver_uuids(target);
        myMsg.setBtnTitle("자세히보기");
        myMsg.setMobileUrl("");
        myMsg.setObjType("text");
        myMsg.setWebUrl("");
        myMsg.setText("메시지 테스트입니다.");

        String accessToken = AuthService.authToken;
        return messageService.sendFriendMessage(accessToken, myMsg);
    }

    public boolean sendInquireFriendMessage(String target) {
        DefaultMessageDto myMsg = new DefaultMessageDto();
        myMsg.setReceiver_uuids(target);
        myMsg.setBtnTitle("자세히보기");
        myMsg.setMobileUrl("");
        myMsg.setObjType("text");
        myMsg.setWebUrl("");
        myMsg.setText("상담문의가 도착하였습니다.");

        String accessToken = AuthService.authToken;
        return messageService.sendFriendMessage(accessToken, myMsg);
    }

    public boolean sendReservationFriendMessage(String target) {
        DefaultMessageDto myMsg = new DefaultMessageDto();
        myMsg.setReceiver_uuids(target);
        myMsg.setBtnTitle("자세히보기");
        myMsg.setMobileUrl("");
        myMsg.setObjType("text");
        myMsg.setWebUrl("");
        myMsg.setText("예약이 확정되었습니다.");

        String accessToken = AuthService.authToken;
        return messageService.sendFriendMessage(accessToken, myMsg);
    }

    public boolean sendHistoryFriendMessage(String target) {
        DefaultMessageDto myMsg = new DefaultMessageDto();
        myMsg.setReceiver_uuids(target);
        myMsg.setBtnTitle("자세히보기");
        myMsg.setMobileUrl("");
        myMsg.setObjType("text");
        myMsg.setWebUrl("");
        myMsg.setText("유저이력을 조회하였습니다.");

        String accessToken = AuthService.authToken;
        return messageService.sendFriendMessage(accessToken, myMsg);
    }

    public boolean sendAuctionFriendMessage(String target) {
        DefaultMessageDto myMsg = new DefaultMessageDto();
        myMsg.setReceiver_uuids(target);
        myMsg.setBtnTitle("자세히보기");
        myMsg.setMobileUrl("");
        myMsg.setObjType("text");
        myMsg.setWebUrl("");
        myMsg.setText("경매가 응찰되었습니다.");

        String accessToken = AuthService.authToken;
        return messageService.sendFriendMessage(accessToken, myMsg);
    }

    public boolean sendBidSuccessFriendMessage(String target) {
        DefaultMessageDto myMsg = new DefaultMessageDto();
        myMsg.setReceiver_uuids(target);
        myMsg.setBtnTitle("자세히보기");
        myMsg.setMobileUrl("");
        myMsg.setObjType("text");
        myMsg.setWebUrl("");
        myMsg.setText("축하드립니다. 낙찰 되었습니다.");

        String accessToken = AuthService.authToken;
        return messageService.sendFriendMessage(accessToken, myMsg);
    }

    public boolean sendInquireMessage(String access_Token) {
        DefaultMessageDto myMsg = new DefaultMessageDto();
        myMsg.setBtnTitle("자세히보기");
        myMsg.setMobileUrl("");
        myMsg.setObjType("text");
        myMsg.setWebUrl("");
        myMsg.setText("상담문의가 도착하였습니다.");

        return messageService.sendMessage(access_Token, myMsg);
    }

    public boolean sendReservationMessage(String access_Token) {
        DefaultMessageDto myMsg = new DefaultMessageDto();
        myMsg.setBtnTitle("자세히보기");
        myMsg.setMobileUrl("");
        myMsg.setObjType("text");
        myMsg.setWebUrl("");
        myMsg.setText("예약 확정 되었습니다.");

        return messageService.sendMessage(access_Token, myMsg);
    }

    public boolean sendReservationCancelMessage(String access_Token) {
        DefaultMessageDto myMsg = new DefaultMessageDto();
        myMsg.setBtnTitle("자세히보기");
        myMsg.setMobileUrl("");
        myMsg.setObjType("text");
        myMsg.setWebUrl("");
        myMsg.setText("예약이 취소 되었습니다.");

        return messageService.sendMessage(access_Token, myMsg);
    }

    public boolean sendHistoryMessage(String access_Token) {
        DefaultMessageDto myMsg = new DefaultMessageDto();
        myMsg.setBtnTitle("자세히보기");
        myMsg.setMobileUrl("");
        myMsg.setObjType("text");
        myMsg.setWebUrl("");
        myMsg.setText("유저이력을 조회하였습니다.");

        return messageService.sendMessage(access_Token, myMsg);
    }

    public boolean sendWorkStartMessage(String access_Token) {
        DefaultMessageDto myMsg = new DefaultMessageDto();
        myMsg.setBtnTitle("자세히보기");
        myMsg.setMobileUrl("");
        myMsg.setObjType("text");
        myMsg.setWebUrl("");
        myMsg.setText("작업이 시작되었습니다.");

        return messageService.sendMessage(access_Token, myMsg);
    }

    public boolean sendWorkFinishMessage(String access_Token) {
        DefaultMessageDto myMsg = new DefaultMessageDto();
        myMsg.setBtnTitle("자세히보기");
        myMsg.setMobileUrl("");
        myMsg.setObjType("text");
        myMsg.setWebUrl("");
        myMsg.setText("작업이 완료되었습니다.");


        return messageService.sendMessage(access_Token, myMsg);
    }

    public boolean sendAuctionMessage(String access_Token) {
        DefaultMessageDto myMsg = new DefaultMessageDto();
        myMsg.setBtnTitle("자세히보기");
        myMsg.setMobileUrl("");
        myMsg.setObjType("text");
        myMsg.setWebUrl("");
        myMsg.setText("경매 입찰 완료되었습니다.");

        return messageService.sendMessage(access_Token, myMsg);
    }

    public boolean sendChatMessage(String access_Token) {
        DefaultMessageDto myMsg = new DefaultMessageDto();
        myMsg.setBtnTitle("자세히보기");
        myMsg.setMobileUrl("");
        myMsg.setObjType("text");
        myMsg.setWebUrl("");
        myMsg.setText("새로운 채팅이 도착하였습니다.");

        return messageService.sendMessage(access_Token, myMsg);
    }

    public boolean sendBidSuccessMessage(String access_Token) {
        DefaultMessageDto myMsg = new DefaultMessageDto();
        myMsg.setBtnTitle("자세히보기");
        myMsg.setMobileUrl("");
        myMsg.setObjType("text");
        myMsg.setWebUrl("");
        myMsg.setText("경매 낙찰되었습니다.");

        return messageService.sendMessage(access_Token, myMsg);
    }
}