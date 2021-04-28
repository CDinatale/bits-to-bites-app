import React, { useState, useEffect } from 'react';
import styles from "../styles/LoginStyles.js"
import userService from '../services/UserService.js';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ImageBackground,
  Alert,
} from 'react-native';

const LoginScreen = ({ navigation }) => {

  let [email, setEmail] = useState('');
  let [emailError, setEmailError] = useState('');
  let [password, setPassword] = useState('');
  let [passwordError, setPasswordError] = useState('');

  //store logged in user
  const storeData = async (value) => {
    try {
      const obj = JSON.stringify(value)
      await AsyncStorage.setItem('@user', obj)
    } catch (e) {
    }
  }

  let onSubmit = () => {
    emailValidator();
    passwordValidator();
    if (emailValidator() && passwordValidator()) {
      verifyLogin()
    }
  }

  //verify that user exists and that password is correct
  let verifyLogin = () => {
    userService.verifyUser(email, password).then((res) => {
      let passwordMatch = res.data;
      if (!passwordMatch) {
        setPasswordError("Incorrect Password. Please try again.")
      }
      else {
        userService.getUserByEmail(email).then((res) => {
          let user = res.data;
          storeData(user);
        }).catch(err => console.log(err.response.data))
        navigation.navigate('Dashboard');
      }
    })
    .catch(err => Alert.alert(
      'Error',
      'User not found!',
      [
        {
          text: 'Ok',
        },
      ],
      { cancelable: false },
      console.log(err)
    ))
  }

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
      setPasswordError("Enter a Valid Password.");
    } else {
      setPasswordError("");
      return true;
    }
    return false;
  };

  return (
    <View style={styles.backgroundContainer}>
      <ImageBackground source={require("../assets/images/background/light-wood.jpg")} style={styles.image}>
        <View style={styles.container}>
          <Image
            style={{ width: 300.5, height: 222.5, marginBottom: 27 }}
            source={require("../assets/images/logo/bitstobiteslogo.png")}
          />
          <View style={styles.errorText}>
            <Text style={{ color: 'red', fontWeight: 'bold',  fontSize: 16 }}>{emailError}</Text>
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
          <Text style={{ color: 'red', fontWeight: 'bold', fontSize: 16 }}>{passwordError}</Text>
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
          <TouchableOpacity style={styles.loginBtn}
            onPress={() => onSubmit()}>
            <Text style={styles.loginText}>
              Login</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={styles.forgot} onPress={() => {
              navigation.navigate('ForgotPassword');
            }}>Forgot Password?</Text>
          </TouchableOpacity>
          <Text style={styles.signupText1}> {"Don't have an account? "}
            <Text style={styles.signupText} onPress={() => {
              navigation.navigate('Register');
            }}>
              Sign Up</Text>
          </Text>
        </View>
      </ImageBackground>
    </View>
  );
};

export default LoginScreen;
