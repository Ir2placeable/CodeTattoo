package com.example.codetattoochat.repository;

import com.example.codetattoochat.entity.MessageEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface MessageRepository extends JpaRepository<MessageEntity, Long> {


    public
    @Query(value = "SELECT distinct sender, receiver, content, created_At, reservation_id " +
            "FROM chat_msg m " +
            "WHERE m.sender = :sender OR m.receiver = :sender " +
            "ORDER BY m.id DESC",
            nativeQuery = true)
    Iterable<Object[]> findUserList(String sender);


    @Query(value = "SELECT * " +
            "FROM chat_msg m " +
            "WHERE (m.reservation_id = :reservation_id)" +
            "ORDER BY m.id ASC",
            nativeQuery = true)
    Iterable<MessageEntity> findMessageList(String reservation_id);
}
