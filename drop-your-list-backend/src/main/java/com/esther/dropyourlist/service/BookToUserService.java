package com.esther.dropyourlist.service;

import com.esther.dropyourlist.model.BookToUser;
import com.esther.dropyourlist.repo.BookToUserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BookToUserService {
    public final BookToUserRepo bookToUserRepo;

    @Autowired
    public BookToUserService(BookToUserRepo bookToUserRepo) {
        this.bookToUserRepo = bookToUserRepo;
    }

    public BookToUser addRelation(BookToUser bookToUser){
        return bookToUserRepo.save(bookToUser);
    }

    public int deleteRelation(String isbn, String name){
        Long id = bookToUserRepo.deleteRelation(isbn, name);
        bookToUserRepo.deleteById(id);
        return 1;
    }
}
