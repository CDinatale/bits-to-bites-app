package com.capstone.project.controllers;

import com.capstone.project.exception.ResourceNotFoundException;
import com.capstone.project.model.User;
import com.capstone.project.services.UserService;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.Random;
import java.util.Set;

@RestController
@RequestMapping("api/public")
public class UserController {
    private final UserService userService;
    private final JavaMailSender javaMailSender;


    public UserController(UserService userService, JavaMailSender javaMailSender){
        this.userService = userService;
        this.javaMailSender = javaMailSender;
    }

    //get all users api
    @GetMapping("allUsers")
    public Set<User> allUsers(){
        return this.userService.findAll();
    }

    // get user by email rest api
    @GetMapping("/users/email/{email}")
    public User getUserByEmail(@PathVariable String email) {
        User user = userService.findByEmail(email);
        if(user == null){
            throw new ResourceNotFoundException("There is no user with email" + email);
        }
        return user;
    }

    // get user by id rest api
    @GetMapping("/users/username/{username}")
    public User getUserByUsername(@PathVariable String username) {
        User user = userService.findByUsername(username);
        if(user == null){
            throw new ResourceNotFoundException("There is no user with username" + username);
        }
        return user;
    }

    // get user by id rest api
    @GetMapping("/login/{email}&{password}")
    public Boolean userLogin(@PathVariable String email, @PathVariable String password) {
        Boolean verifyLogin = userService.verifyLogin(email, password);
        return verifyLogin;
    }

    // create user rest api
    @PostMapping("/createUser")
    public User createUser(@RequestBody User user) {
        user.setStatus("active");
        user.setRole("user");
        return userService.save(user);
    }

    // update user rest api
    @PutMapping("/updateUser/{email}")
    public User updateUser(@PathVariable String email, @RequestBody User userDetails) {

        User user = userService.findByEmail(email);
        if(user == null){
            throw new ResourceNotFoundException("There is no user with username" + email);
        }
        user.setUsername(userDetails.getUsername());
        user.setPassword(userDetails.getPassword());
        user.setEmail(userDetails.getEmail());
        return userService.save(user);
    }

    // delete user rest api
    @DeleteMapping("/deleteUser/{email}")
    public Map< String, Boolean > deleteUser(@PathVariable String email) {
        User user = userService.findByEmail(email);
        if(user == null){
            throw new ResourceNotFoundException("There is no user with username" + email);
        }
        userService.delete(user);
        Map < String, Boolean > response = new HashMap< >();
        response.put("deleted", Boolean.TRUE);
        return response;
    }

    //send user forgotten password email
    @PostMapping("/sendEmail/{email}")
    public User sendEmail(@PathVariable String email){
        String SALTCHARS = "abcdefjhijklmnopqrstuvwxyz1234567890";
        StringBuilder salt = new StringBuilder();
        Random rnd = new Random();
        while (salt.length() < 10) { // length of the random string.
            int index = (int) (rnd.nextFloat() * SALTCHARS.length());
            salt.append(SALTCHARS.charAt(index));
        }
        String pwd = salt.toString();
        SimpleMailMessage msg = new SimpleMailMessage();
        msg.setTo(email);
        User user = userService.findByEmail(email);
        user.setPassword(pwd);
        msg.setSubject("Forgot Password: Bits To Bites App");
        msg.setText("Hello "+ user.getUsername() + "!"+ "\n\n" +
                "Your temporary password is: " + pwd + "\n" + "Please log into the Bits to Bites App to " +
                "change this password.");
        javaMailSender.send(msg);
        return userService.save(user);
    }
}
