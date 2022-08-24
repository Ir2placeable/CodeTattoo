package com.allchat.allchatchatting.handler;

import com.allchat.allchatchatting.handler.exception.CustomException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestController;

@RestController
@ControllerAdvice
public class ControllerExceptionHandler {

    /*
    //유효성 검사
    @ExceptionHandler(CustomValidationException.class)
    public ResponseEntity<?> validationApiException(CustomValidationException e){

        return new ResponseEntity<>(e.errorMap, HttpStatus.BAD_REQUEST);
    }
*/

    //에러 처리
    @ExceptionHandler(CustomException.class)
    public ResponseEntity<?> apiException(CustomException e){

        return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
    }
}
