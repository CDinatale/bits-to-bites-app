package com.capstone.project.services;

import com.capstone.project.model.Pantry;
import com.capstone.project.model.User;
import com.capstone.project.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.Set;

@Service
public class UserService implements UserServiceAbs{

    @Autowired
    private UserRepository userRepository;

    @Override
    public User findByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    @Override
    public User findByUsername(String username) {
        return userRepository.findByUsername(username);
    }

    @Override
    public User save(User user) {
        return userRepository.save(user);
    }

    @Override
    public User saveAdmin(User user) {
        return userRepository.save(user);
    }

    @Override
    public Boolean verifyLogin(String email, String password) {
        User user = userRepository.findByEmail(email);
        return user.getPassword().equals(password) && user.getStatus().equals("active");
    }

    @Override
    public Set<User> findAll() {
        Set<User> users = new HashSet<>(userRepository.findAll());
        return users;
    }

    @Override
    public User findById(Long id) {
        return userRepository.findById(id).orElse(null);
    }

    @Override
    public void delete(User object) {
        userRepository.delete(object);
    }

    @Override
    public void deleteById(Long aLong) {
        userRepository.deleteById(aLong);
    }

}
