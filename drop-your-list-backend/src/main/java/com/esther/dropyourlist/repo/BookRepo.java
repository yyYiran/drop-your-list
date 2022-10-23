package com.esther.dropyourlist.repo;

import com.esther.dropyourlist.model.Book;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

// Enable CURD operations
// API of CrudRepository and PagingAndSortingRepository
public interface BookRepo extends JpaRepository<Book, Long> {
    Optional<List<Book>> findBooksByTitle(String title);

    Optional<Book> findBookById(Long id);

    @Query("SELECT b FROM Book b where b.isbn=:isbn")
    Optional<Book> findBookByIsbn(@Param("isbn") String isbn);

    @Query("SELECT b.title from Book b, BookToUser bu where bu.name=:name and  bu.isbn=b.isbn")
    List<String> findBooksByUser(@Param("name") String name);

    @Query("select u.name from User u, BookToUser bu where bu.isbn=:isbn and  bu.name=u.name")
    List<String> findUsersByBook(@Param("isbn") String isbn);
}
