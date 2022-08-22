package com.allchat.allchatchatting.collection;

import org.springframework.data.mongodb.repository.Query;
import org.springframework.data.mongodb.repository.ReactiveMongoRepository;
import org.springframework.data.mongodb.repository.Tailable;
import reactor.core.publisher.Flux;

import java.time.LocalDateTime;

public interface ChatRepository extends ReactiveMongoRepository<Chat, String> {

    //Flux (흐름) - 한번만 받는게 아니라 계속 받겠다. - response 를 유지하면서 계속 흘려보내기
    @Tailable // 커서를 안닫고 계속 유지한다.
    @Query("{roomId:?0, createDateTime:{$gte:?1}}")
    Flux<Chat> mFindByRoomId(Integer chatRoomId, LocalDateTime joinDateTime);
}
