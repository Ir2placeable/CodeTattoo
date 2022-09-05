package com.example.codetattoochat.repository;

import lombok.Builder;
import lombok.Data;
import org.hibernate.annotations.GeneratorType;
import org.springframework.data.annotation.CreatedDate;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Data
@Table(name="Chat_Msg")
public class MessageEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String sender;

    @Column(nullable = false)
    private String receiver;

    @Column(nullable = false)
    private String content;

    @CreatedDate
    @Column(nullable = false)
    private LocalDateTime createdAt;

    @Builder
    public MessageEntity(
            Long id,
            String sender,
            String receiver,
            String content,
            LocalDateTime createdAt
    ) {
        this.id = id;
        this.sender = sender;
        this.receiver = receiver;
        this.content = content;
        this.createdAt = createdAt;
    }
}
