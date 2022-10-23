package com.esther.dropyourlist;

import com.esther.dropyourlist.model.User;
import com.esther.dropyourlist.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/login")
public class LoginResource {
    private final UserService userService;

    @Autowired
    public LoginResource(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/all")
    public ResponseEntity<List<User>> getAllUsers(){
        List<User> users = userService.findAllUsers();
        return new ResponseEntity<>(users, HttpStatus.OK);
    }

    // Employee in json from caller (body of the request)
    @PostMapping("/signup")
    public ResponseEntity<User> signup(@RequestBody User user){
        User newuser = userService.addUser(user);
        return new ResponseEntity<>(newuser, HttpStatus.CREATED);
    }

    @GetMapping("/lookup/{name}")
    public ResponseEntity<User> findUserByName(@PathVariable("name") String name){
        User user = userService.findUserByName(name);
        return new ResponseEntity<>(user, HttpStatus.OK);
    }
}
