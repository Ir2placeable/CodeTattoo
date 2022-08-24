package com.allchat.allchatchatting.collection;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.time.LocalDateTime;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Document(collection = "chat")
public class Chat {

    @Id
    private String id;

    private String msg;

    private String sender;

    private Integer roomId;

    private String participant;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy/MM/dd HH:mm")
    @Builder.Default
    private LocalDateTime createDateTime = LocalDateTime.now();

}
