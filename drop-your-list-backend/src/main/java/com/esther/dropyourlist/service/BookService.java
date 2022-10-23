package com.esther.dropyourlist.service;

import com.esther.dropyourlist.exception.BookNotFoundException;
import com.esther.dropyourlist.model.Book;
import com.esther.dropyourlist.repo.BookRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BookService {
    public final BookRepo bookRepo;

    // dependency injection of BookRepo into BookService
    @Autowired
    public BookService(BookRepo bookRepo) {
        this.bookRepo = bookRepo;
    }

    public Book addBook(Book book){
        return bookRepo.save(book);
    }

    public List<Book> findAllBooks(){
        return bookRepo.findAll();
    }

    public List<Book> findBooksByTitle(String title) {
        return bookRepo.findBooksByTitle(title).orElseThrow(()-> new BookNotFoundException("Book id=" + title + " not found"));
    }

    public Book findBookById(Long id) {
        return bookRepo.findBookById(id).orElseThrow(()-> new BookNotFoundException("Book id=" + id + " not found"));
    }

    public Book findBookByIsbn(String isbn) {
        return bookRepo.findBookByIsbn(isbn).orElse(null);
//        return bookRepo.findBookByIsbn(isbn).or;
    }

    public List<String> findBooksByUser(String name){
        return bookRepo.findBooksByUser(name);
    }

    public List<String> findUsersByBook(String isbn){
        return bookRepo.findUsersByBook(isbn);
    }

    public void deleteById(Long id){
        bookRepo.deleteById(id);
    }

    public Book updateBook(Book book){
        return bookRepo.save(book);
    }

}
