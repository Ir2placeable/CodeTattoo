package com.example.codetattoochat.repository;

import com.example.codetattoochat.entity.MessageEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

//JPA REPOSITORY로써, 직접 RDS MariaDB와 연동된다.
//Query 노테이션에 기재된 SQL문의 결괏값을 반환한다.
@Repository
public interface MessageRepository extends JpaRepository<MessageEntity, Long> {

    @Query(
            value = "DELETE " +
                    "FROM chat_msg " +
                    "WHERE reservation_id = :reservation_id",
            nativeQuery = true)
    void delete(
            String reservation_id
    );


    @Query(value = "SELECT distinct sender, receiver, content, created_At, reservation_id, is_image " +
            "FROM chat_msg m " +
            "WHERE m.sender = :sender OR m.receiver = :sender " +
            "ORDER BY m.id DESC",
            nativeQuery = true)
    Iterable<Object[]> findUserList(String sender);

    @Query(
            value = "SELECT content " +
                    "FROM chat_msg " +
                    "WHERE reservation_id = :reservation_id AND is_image = true",
            nativeQuery = true)
    Iterable<String> findUrlList(String reservation_id);

    @Query(value = "SELECT * " +
            "FROM chat_msg m " +
            "WHERE (m.reservation_id = :reservation_id)" +
            "ORDER BY m.id ASC",
            nativeQuery = true)
    Iterable<MessageEntity> findMessageList(String reservation_id);
}
