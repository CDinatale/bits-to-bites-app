import React, { useState } from 'react';
import styles from "../styles/EditEmailStyles.js"
import userService from "../services/UserService.js"
import AsyncStorage from '@react-native-async-storage/async-storage';
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
} from 'react-native';

const EditEmailScreen = ({ route, navigation }) => {

  let [email, setEmail] = useState("");
  let [emailError, setEmailError] = useState('');
  let [userData, setUserData] = useState(route.params.user)

  //validate email
  let emailValidator = () => {
    if(email==""){
      setEmailError("Enter a Valid Email");
    } else if(email.indexOf('@') == -1 ){
      setEmailError("Enter a Valid Email");
    } else{
      setEmailError("");
      return true;
    }
    return false;
  };

  //update user information in local storage
  const updateUserData = async (value) => {
    try {
      const obj = JSON.stringify(value)
      await AsyncStorage.setItem('@user', obj)
    } catch (e) {
    }
  }

  let onSubmit = () => {
    emailValidator();
    if (emailValidator()) {
      update_user();
      navigation.navigate('Profile')
    }
  }

  //update user data in database
  let update_user = () => {
    let user = {username: userData.username, email: email, password: userData.password};
    console.log('user => ' + JSON.stringify(user));
    userService.updateUser(user, userData.email)
    .then(response => console.log(response),
    updateUserData(user))
    .catch(err => console.log(err.response.data));
  }

    return (
      <View style={styles.backgroundContainer}>
        <ImageBackground source={require("../assets/images/background/light-wood.jpg")} style={styles.image}>
          <View style={styles.container}>
             <View style={styles.searchContainer}>
                 <ImageBackground source={require("../assets/images/background/dark-wood.jpg")} style={styles.image}>
                     <View style={styles.searchHeader}>
                         <Text style={styles.searchText}>Edit Email</Text>
                     </View>
                 </ImageBackground>
             </View>
             <View style={styles.profileContainer}>
              <View style={styles.scroll}>
                  <View>
                    <Text style={{color: 'red', fontWeight: 'bold'}}>{emailError}</Text>
                  </View>
                  <Text>Email:</Text>
                  <View style={styles.inputView}>
                    <TextInput
                      style={styles.inputText}
                      placeholder="Email"
                      onBlur={()=>emailValidator()}
                      placeholderTextColor="lightgrey"
                      onChangeText={text => setEmail(text)}
                      value={email}
                    />
                  </View>
                 <TouchableOpacity
                   style={styles.editBtn} onPress={() => onSubmit()}>
                   <Text style={styles.logoutText}>SAVE</Text>
                 </TouchableOpacity>
            </View>
            </View>
          </View>
       </ImageBackground>
    </View>
    );
};

export default EditEmailScreen;
