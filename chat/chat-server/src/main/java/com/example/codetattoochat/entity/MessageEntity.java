package com.example.codetattoochat.entity;

import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.GeneratorType;
import org.springframework.data.annotation.CreatedDate;

import javax.persistence.*;
import java.time.LocalDateTime;

//RDS MariaDB 내의 chat_msg 테이블
@Entity
@Data
@Table(name="chat_msg")
@NoArgsConstructor
@Getter
public class MessageEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String content;

    @Column(nullable = false)
    private String created_At;

    @Column(nullable = false)
    private String receiver;

    @Column(nullable = false)
    private String sender;

    @Column(nullable = false)
    private String reservation_id;

    @Column(nullable = false)
    private Boolean is_image;

    @Builder
    public MessageEntity(
            Long id,
            String sender,
            String receiver,
            String content,
            String created_At,
            String reservation_id,
            Boolean is_image
    ) {
        this.id = id;
        this.sender = sender;
        this.receiver = receiver;
        this.content = content;
        this.created_At = created_At;
        this.reservation_id = reservation_id;
        this.is_image = is_image;
    }

}
