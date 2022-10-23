package com.esther.dropyourlist.exception;

public class BookNotFoundException extends RuntimeException{
    public BookNotFoundException(String msg) {
        super(msg);
    }
}
