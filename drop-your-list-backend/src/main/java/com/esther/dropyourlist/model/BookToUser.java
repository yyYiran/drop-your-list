package com.esther.dropyourlist.model;

import javax.persistence.*;

@Entity
public class BookToUser {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(nullable = false, unique = true)
    private Long id;


    public String getIsbn() {
        return isbn;
    }

    public void setIsbn(String isbn) {
        this.isbn = isbn;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    private String isbn;
    private String name;

    public BookToUser(String isbn, String name) {
        this.isbn = isbn;
        this.name = name;
    }



    @Override
    public String toString() {
        return "BookToUser{" +
                "id=" + id +
                ", isbn='" + isbn + '\'' +
                ", name='" + name + '\'' +
                '}';
    }

    public BookToUser() {

    }

    public void setId(Long id) {
        this.id = id;
    }


    public Long getId() {
        return id;
    }
}
