import React, { useState, useEffect } from 'react';
import styles from "../styles/RegisterStyles.js";
import UserService from '../services/UserService.js';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Button,
  TextInput,
  TouchableOpacity,
  Image,
  ImageBackground,
  Alert,
  Platform,
} from 'react-native';


const RegisterScreen = ({ navigation }) => {

  let [username, setUsername] = useState('');
  let [usernameError, setUsernameError] = useState('');
  let [email, setEmail] = useState('');
  let [emailError, setEmailError] = useState('');
  let [password, setPassword] = useState('');
  let [passwordError, setPasswordError] = useState('');
  let [confirmPassword, setConfirmPassword] = useState('');
  let [confirmPasswordError, setConfirmPasswordError] = useState('');

  let onSubmit = () => {
    usernameValidator();
    emailValidator();
    passwordValidator();
    confirmPasswordValidator();
    if (usernameValidator() && emailValidator() && passwordValidator() && confirmPasswordValidator()) {
      registerUser();
    }
  }

  //register new user account
  let registerUser = () => {
    let user = { username: username, email: email, password: password };
    console.log('user => ' + JSON.stringify(user));
    UserService.createUser(user)
      .then(response => console.log(response),
      Alert.alert(
        'Success',
        'Registration successful!',
        [
          {
            text: 'Ok',
            onPress: () => navigation.navigate('Login'),
          },
        ],
        { cancelable: false }
      ))
      .catch(err => console.log(err));
  }

  //validate username
  let usernameValidator = () => {
    if (username == "") {
      setUsernameError("Please enter a valid username.");
    } else {
      setUsernameError("");
      return true;
    }
    return false;
  };

  //validate email
  let emailValidator = () => {
    let re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    let isValid = re.test(String(email).toLowerCase());
    if(!isValid){
      setEmailError("Enter a valid email.");
    }
    else{
      setEmailError("");
    }
    return isValid;
  };

  //validate password
  let passwordValidator = () => {
    if (password == "") {
      setPasswordError("Please enter a valid password.");
    } else {
      setPasswordError("");
      return true;
    }
    return false;
  };

  //validate password match
  let confirmPasswordValidator = () => {
    if (confirmPassword == "") {
      setConfirmPasswordError("Please enter a valid password.");
    } else if (password != confirmPassword) {
      setConfirmPasswordError("Passwords must match.");
    } else {
      setConfirmPasswordError("");
      return true;
    }
    return false;
  };

  return (
    <View style={styles.backgroundContainer}>
      <ImageBackground source={require("../assets/images/background/light-wood.jpg")} style={styles.image}>
        <View style={styles.container}>
          <View style={styles.headerView}>
            <Text style={styles.header1Text}>
              Welcome to Bits to Bites!
           </Text>
            <Text style={styles.header2Text}>
              Let us help you prepare your next meal.
           </Text>
          </View>
          <View style={styles.errorText}>
            <Text style={{ color: 'red', fontWeight: 'bold' }}>{usernameError}</Text>
          </View>
          <View style={styles.inputView} >
            <TextInput
              style={styles.inputText}
              placeholder="Username"
              onBlur={() => usernameValidator()}
              placeholderTextColor="lightgrey"
              onChangeText={(text) => { setUsername(text) }}
            />
          </View>
          <View style={styles.errorText}>
            <Text style={{ color: 'red', fontWeight: 'bold' }}>{emailError}</Text>
          </View>
          <View style={styles.inputView} >
            <TextInput
              style={styles.inputText}
              placeholder="Email"
              onBlur={() => emailValidator()}
              placeholderTextColor="lightgrey"
              onChangeText={(text) => { setEmail(text) }}
            />
          </View>
          <View style={styles.errorText}>
            <Text style={{ color: 'red', fontWeight: 'bold' }}>{passwordError}</Text>
          </View>
          <View style={styles.inputView} >
            <TextInput
              secureTextEntry
              style={styles.inputText}
              placeholder="Password"
              onBlur={() => passwordValidator()}
              placeholderTextColor="lightgrey"
              onChangeText={(text) => { setPassword(text) }}
            />
          </View>
          <View style={styles.errorText}>
            <Text style={{ color: 'red', fontWeight: 'bold' }}>{confirmPasswordError}</Text>
          </View>
          <View style={styles.inputView} >
            <TextInput
              secureTextEntry
              style={styles.inputText}
              placeholder="Confirm Password"
              onBlur={() => confirmPasswordValidator()}
              placeholderTextColor="lightgrey"
              onChangeText={(text) => { setConfirmPassword(text) }}
            />
          </View>

          <TouchableOpacity style={styles.registerBtn} onPress={() => onSubmit()}>
            <Text style={styles.registerText}>Register</Text>
          </TouchableOpacity>
          <Text style={styles.signinText1}> {"Already have an account? "}
            <Text style={styles.signinText} onPress={() => {
              navigation.navigate('Login');
            }}>
              Sign In</Text>
          </Text>
        </View>
      </ImageBackground>
    </View>
  );
};

export default RegisterScreen;
