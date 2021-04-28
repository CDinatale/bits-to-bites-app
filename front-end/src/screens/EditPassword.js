import React, {useState} from 'react';
import styles from "../styles/EditPasswordStyles.js"
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

const EditPasswordScreen = ({ route, navigation }) => {

  let [userData, setUserData] = useState(route.params.user)
  let [oldPassword, setOldPassword] = useState(route.params.user.password);
  let [oldPasswordError, setOldPasswordError] = useState('');
  let [newPassword, setNewPassword] = useState('');
  let [newPasswordError, setNewPasswordError] = useState('');
  let [confirmPassword, setConfirmPassword] = useState('');
  let [confirmPasswordError, setConfirmPasswordError] = useState('');


  //validate old password
  let oldPasswordValidator = () => {
    if(oldPassword==""){
      setOldPasswordError("Enter a Valid Password");
    } else{
      setOldPasswordError("");
      return true;
    }
    return false;
  };

  //validate new password
  let newPasswordValidator = () => {
    if(newPassword==""){
      setNewPasswordError("Enter a Valid Password");
    } else{
      setNewPasswordError("");
      return true;
    }
    return false;
  };

  //confirm that passwords match
  let confirmPasswordValidator = () => {
    if(confirmPassword==""){
      setConfirmPasswordError("Enter a Valid Password");
    } else if(newPassword != confirmPassword){
      setConfirmPasswordError("Passwords Must Match");
    }else{
      setConfirmPasswordError("");
      return true;
    }
    return false;
  };

  //update user data in local storage
  const updateUserData = async (value) => {
    try {
      const obj = JSON.stringify(value)
      await AsyncStorage.setItem('@user', obj)
    } catch (e) {
    }
  }

  let onSubmit = () => {
    oldPasswordValidator();
    newPasswordValidator();
    confirmPasswordValidator();
    if (oldPasswordValidator() & newPasswordValidator() & confirmPasswordValidator()) {
      update_user();
      navigation.navigate('Profile')
    }
  }

  //update user data in database
  let update_user = () => {
    let user = {username: userData.username, email: userData.email, password: newPassword};
    console.log('user => ' + JSON.stringify(user));
    userService.updateUser(user, userData.email)
    .then(response => console.log(response),
    updateUserData(user))
    .catch(err => console.log(err));
  }

    return (
      <View style={styles.backgroundContainer}>
        <ImageBackground source={require("../assets/images/background/light-wood.jpg")} style={styles.image}>
          <View style={styles.container}>
             <View style={styles.searchContainer}>
                 <ImageBackground source={require("../assets/images/background/dark-wood.jpg")} style={styles.image}>
                     <View style={styles.searchHeader}>
                         <Text style={styles.searchText}>Edit Password</Text>
                     </View>
                 </ImageBackground>
             </View>
             <View style={styles.profileContainer}>
              <View style={styles.scroll}>
                <View>
                  <Text style={{color: 'red', fontWeight: 'bold'}}>{oldPasswordError}</Text>
                </View>
                  <Text>Current Password: </Text>
                 <View style={styles.inputView}>
                   <TextInput
                     style={styles.inputText}
                     secureTextEntry
                     placeholder="Old Password"
                     onBlur={()=>oldPasswordValidator()}
                     placeholderTextColor="lightgrey"
                     onChangeText={text => setOldPassword(text)}
                     value={oldPassword}
                   />
                 </View>
                 <View>
                   <Text style={{color: 'red', fontWeight: 'bold'}}>{newPasswordError}</Text>
                 </View>
                 <Text>New Password:</Text>
                 <View style={styles.inputView}>
                   <TextInput
                     style={styles.inputText}
                     secureTextEntry
                     placeholder="New Password"
                     onBlur={()=>newPasswordValidator()}
                     placeholderTextColor="lightgrey"
                     onChangeText={text => setNewPassword(text)}
                     value={newPassword}
                   />
                 </View>
                 <View>
                   <Text style={{color: 'red', fontWeight: 'bold'}}>{confirmPasswordError}</Text>
                 </View>
                 <Text>Confirm New Password:</Text>
                 <View style={styles.inputView}>
                   <TextInput
                     style={styles.inputText}
                     secureTextEntry
                     placeholder="Confirm Password"
                     onBlur={()=>confirmPasswordValidator()}
                     placeholderTextColor="lightgrey"
                     onChangeText={text => setConfirmPassword(text)}
                     value={confirmPassword}
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

export default EditPasswordScreen;
