package com.esther.dropyourlist.repo;

import com.esther.dropyourlist.model.Book;
import com.esther.dropyourlist.model.BookToUser;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface BookToUserRepo extends JpaRepository<BookToUser, Long> {

    @Query("SELECT bu.id from BookToUser bu WHERE bu.isbn=:isbn AND bu.name=:name")
    Long deleteRelation(@Param("isbn") String isbn, @Param("name") String name);

}
