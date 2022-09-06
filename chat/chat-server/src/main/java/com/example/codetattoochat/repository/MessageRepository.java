package com.example.codetattoochat.repository;

import com.example.codetattoochat.entity.MessageEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface MessageRepository extends JpaRepository<MessageEntity, Long> {
    @Query(value = "SELECT distinct sender, receiver, content, created_At " +
            "FROM Chat_Msg m " +
            "WHERE m.sender = :sender OR m.receiver = :sender " +
            "ORDER BY m.id DESC",
            nativeQuery = true)
    Iterable<Object[]> findUserList(String sender);


}
