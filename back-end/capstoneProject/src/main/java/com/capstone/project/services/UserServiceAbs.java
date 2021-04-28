package com.capstone.project.services;

import com.capstone.project.model.User;

import java.util.Set;

public interface UserServiceAbs extends CrudService<User, Long>{
    User findByEmail(String email);
    User findByUsername(String username);
    User save(User user);
    User saveAdmin(User user);
    Boolean verifyLogin(String email, String password);
}
