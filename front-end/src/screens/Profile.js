import React, {useState, useEffect} from 'react';
import styles from "../styles/ProfileStyles.js"
import userService from "../services/UserService"
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';

const ProfileScreen = ({ navigation }) => {

    const [user, setUser] = useState({})

    ////retrieve stored logged in user data
    const getData = async () => {
      try {
        const obj = await AsyncStorage.getItem('@user')
        return JSON.parse(obj);
      } catch(e) {
      }
    }

    //get logged in user data
    useEffect(() => {
      getData().then((data) => setUser(data))
    })

    return (
      <View style={styles.backgroundContainer}>
        <ImageBackground source={require("../assets/images/background/light-wood.jpg")} style={styles.image}>
          <View style={styles.container}>
             <View style={styles.searchContainer}>
                 <ImageBackground source={require("../assets/images/background/dark-wood.jpg")} style={styles.image}>
                     <View style={styles.searchHeader}>
                         <Text style={styles.searchText}>Profile</Text>
                     </View>
                 </ImageBackground>
             </View>
             <View style={styles.profileContainer}>
              <View style={styles.scroll}>
                 <View style={styles.inputView}>
                   <Text>{"Username:                               "}
                   <Text>{user.username}</Text>
                   </Text>
                 </View>
                 <TouchableOpacity
                   style={styles.editBtn}
                   onPress={() => {
                     navigation.navigate('EditUsername', {user});
                   }}>
                   <Text style={styles.logoutText}>Edit Username</Text>
                 </TouchableOpacity>
                 <View style={styles.inputView}>
                   <Text>{"Email:         "}
                   <Text>{user.email}</Text>
                   </Text>
                 </View>
                 <TouchableOpacity
                   style={styles.editBtn}
                   onPress={() => {
                     navigation.navigate('EditEmail', {user});
                   }}>
                   <Text style={styles.logoutText}>Edit Email</Text>
                 </TouchableOpacity>
                 <View style={styles.inputView}>
                   <Text>{"Password:                               "}
                   <Text>**********</Text>
                   </Text>
                </View>
                <TouchableOpacity
                  style={styles.editBtn}
                  onPress={() => {
                    navigation.navigate('EditPassword', {user});
                  }}>
                  <Text style={styles.logoutText}>Edit Password</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.logoutBtn}
                  onPress={() => {
                    navigation.navigate('Login');
                  }}>
                  <Text style={styles.logoutText}>LOG OUT</Text>
                </TouchableOpacity>
            </View>
            </View>
          </View>
       </ImageBackground>
    </View>
    );
};

export default ProfileScreen;
