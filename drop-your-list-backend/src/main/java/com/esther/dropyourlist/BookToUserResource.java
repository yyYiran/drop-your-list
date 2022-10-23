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

@RestController
@RequestMapping("/r")
public class BookToUserResource {
    private final BookToUserService bookToUserService;

    @Autowired
    public BookToUserResource(BookToUserService bookToUserService) {
        this.bookToUserService = bookToUserService;
    }

    @PostMapping("/subscribe")
    public ResponseEntity<BookToUser> subScribe(@RequestBody BookToUser bookToUser){
        BookToUser r = bookToUserService.addRelation(bookToUser);
        return new ResponseEntity<>(r, HttpStatus.CREATED);
    }

    @DeleteMapping("/unsubscribe:{isbn}&{name}")
    public ResponseEntity<Integer> unsubscribe(@PathVariable("isbn")String isbn, @PathVariable("name")String name){
        int i = bookToUserService.deleteRelation(isbn, name);
        return new ResponseEntity<Integer>(i, HttpStatus.OK);
    }
}
