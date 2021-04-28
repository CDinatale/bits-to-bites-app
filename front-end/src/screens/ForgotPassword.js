import React, {useState, useEffect} from 'react';
import { Linking } from 'react-native';
import styles from "../styles/ForgotPasswordStyles.js";
import userService from '../services/UserService.js';
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

const ForgotPasswordScreen = ({navigation}) => {

  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");

  let onSubmit = () => {
    emailValidator();
    if(emailValidator()){
      sendEmail();
      Alert.alert(
        "",
        "A temporary password has been sent to your email!",
        [{ text: "OK", onPress: () => console.log("OK Pressed") }],
        { cancelable: false }
      );
      navigation.navigate('Login');
    }
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

  let sendEmail = () => {
    userService.sendEmail(email).then((res) => {
      console.log(res.data);
    }).catch(err => console.log(err.response.data));
  }

   return (
     <View style={styles.backgroundContainer}>
      <ImageBackground source={require("../assets/images/background/light-wood.jpg")} style={styles.image}>
     <View style={styles.container}>
       <View style ={styles.headerText}>
         <Text style={styles.mainText}>Forgot password?</Text>
         <Text style={styles.subText}>Enter the email address associated with your account.</Text>
        </View>
         <View style={styles.errorText}>
           <Text style={{color: 'red', fontWeight: 'bold', fontSize: 16 }}>{emailError}</Text>
         </View>
        <View style={styles.inputView} >
          <TextInput
            style={styles.inputText}
            placeholder="Email"
            onBlur={()=> emailValidator()}
            placeholderTextColor="lightgrey"
            onChangeText={(text) => setEmail(text)}
          />
        </View>
        <TouchableOpacity onPress={() => onSubmit()} style={styles.registerBtn} >
          <Text style={styles.registerText}>Reset Password</Text>
        </TouchableOpacity>
        </View>
      </ImageBackground>
      </View>
  );

};

export default ForgotPasswordScreen;
