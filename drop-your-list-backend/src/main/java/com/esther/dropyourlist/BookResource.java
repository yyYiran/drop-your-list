package com.esther.dropyourlist;

import com.esther.dropyourlist.model.Book;
import com.esther.dropyourlist.model.BookToUser;
import com.esther.dropyourlist.service.BookService;
import com.esther.dropyourlist.service.BookToUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Controller
 * accept request to service(where the logic) and send back response to caller
 * This is the part of backend exposed to public
 */
@RestController
@RequestMapping("/book")
public class BookResource {
    private final BookService bookService;


    @Autowired
    public BookResource(BookService bookService) {
        this.bookService = bookService;
//        this.bookToUserService = bookToUserService;
    }

    // Goal: return an HTTP reponse
    @GetMapping("/all")
    public ResponseEntity<List<Book>> getAllBooks(){
        List<Book> books = bookService.findAllBooks();
        return new ResponseEntity<>(books, HttpStatus.OK);
    }
//
//    @GetMapping("/{id}")
//    public ResponseEntity<Book> getBookById(@PathVariable("id") Long id){
//        Book book = bookService.findBookById(id);
//        return new ResponseEntity<>(book, HttpStatus.OK);
//    }

    @GetMapping("/isbn:{isbn}")
    public ResponseEntity<Book> getBookByISBN(@PathVariable("isbn") String isbn){
        Book book = bookService.findBookByIsbn(isbn);
        return new ResponseEntity<>(book, HttpStatus.OK);
    }

    @GetMapping("/user:{name}")
    public ResponseEntity<List<String>> findBooksByUser(@PathVariable("name") String name){
        List<String> list = bookService.findBooksByUser(name);
        return new ResponseEntity<>(list, HttpStatus.OK);
    }

    @GetMapping("/book:{isbn}")
    public ResponseEntity<List<String>> findUsersByBook(@PathVariable("isbn") String isbn){
        List<String> list = bookService.findUsersByBook(isbn);
        return new ResponseEntity<>(list, HttpStatus.OK);
    }
    
    // Employee in json from caller (body of the request)
    @PostMapping("/add")
    public ResponseEntity<Book> addBook(@RequestBody Book book){
        Book addedBook = bookService.addBook(book);
        return new ResponseEntity<>(addedBook, HttpStatus.CREATED);
    }



//
//    @PutMapping("/update")
//    public ResponseEntity<Book> updateBook(@RequestBody Book book){
//        Book updatedBook = bookService.updateBook(book);
//        return new ResponseEntity<>(updatedBook, HttpStatus.OK);
//    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Book> deleteBook(@PathVariable("id") Long id){
        bookService.deleteById(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }

}
