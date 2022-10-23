package com.esther.dropyourlist.service;

import com.esther.dropyourlist.model.Book;
import com.esther.dropyourlist.model.User;
import com.esther.dropyourlist.repo.UserRepo;
import org.aspectj.lang.annotation.Before;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {
    public final UserRepo userRepo;

    @Autowired
    public UserService(UserRepo userRepo) {
        this.userRepo = userRepo;
    }

    public List<User> findAllUsers(){
        return this.userRepo.findAll();
    }
    public User addUser(User user){
        return userRepo.save(user);
    }

    public User findUserByName(String name) {
        return userRepo.findUserByName(name).orElse(null);
    }


}
