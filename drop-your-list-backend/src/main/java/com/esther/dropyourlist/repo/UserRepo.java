package com.esther.dropyourlist.repo;

import com.esther.dropyourlist.model.Book;
import com.esther.dropyourlist.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface UserRepo extends JpaRepository<User, Long> {

    @Query("SELECT u FROM User u WHERE u.name=:name")
    Optional<User> findUserByName(@Param("name") String name);

//    @Query("SELECT u.password FROM User u WHERE u.name=:name")
//    String findPasswordByName(@Param("name") String name);
}
