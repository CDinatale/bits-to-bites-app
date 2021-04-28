import React, { useState } from 'react';
import styles from "../styles/EditNameStyles.js"
import userService from "../services/UserService.js"
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';

const EditNameScreen = ({ route, navigation }) => {

    let [username, setUsername] = useState("");
    let [usernameError, setUsernameError] = useState('');
    let [userData, setUserData] = useState(route.params.user)

    //validate username
    let usernameValidator = () => {
      if(username==""){
        setUsernameError("Username field cannot be empty.");
      } else{
        setUsernameError("");
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
      usernameValidator();
      if (usernameValidator()) {
        update_user();
        navigation.navigate('Profile')
      }
    }
  
    //update user data in database
    let update_user = () => {
      let user = {username: username, email: userData.email, password: userData.password};
      updateUserData(user);
      console.log('user => ' + JSON.stringify(user));
      userService.updateUser(user, user.email)
      .then(response => console.log(response))
      .catch(err => console.log(err));
    }

    return (
      <View style={styles.backgroundContainer}>
        <ImageBackground source={require("../assets/images/background/light-wood.jpg")} style={styles.image}>
          <View style={styles.container}>
             <View style={styles.searchContainer}>
                 <ImageBackground source={require("../assets/images/background/dark-wood.jpg")} style={styles.image}>
                     <View style={styles.searchHeader}>
                         <Text style={styles.searchText}>Edit Username</Text>
                     </View>
                 </ImageBackground>
             </View>
             <View style={styles.profileContainer}>
              <View style={styles.scroll}>
                  <View>
                    <Text style={{color: 'red', fontWeight: 'bold'}}>{usernameError}</Text>
                  </View>
                  <Text>Username:</Text>

                 <View style={styles.inputView}>

                   <TextInput
                     style={styles.inputText}
                     placeholder="Username"
                     onBlur={()=>usernameValidator()}
                     placeholderTextColor="lightgrey"
                     onChangeText={text => setUsername(text)}
                     value={username}
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

export default EditNameScreen;
