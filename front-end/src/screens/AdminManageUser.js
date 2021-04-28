import React, {useState, useEffect, Component} from 'react';
import styles from '../styles/AdminStyles';
import userService from '../services/UserService.js';
import adminService from '../services/AdminService.js';
import Ionicons from 'react-native-vector-icons/Ionicons';

import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  ScrollView,
  View,
  Text,
  TextInput,
  Image,
  ImageBackground,
  FlatList,
  Button,
  SafeAreaView,
  ActivityIndicator,
  TouchableOpacity,
  Alert,
} from 'react-native';

const AdminManageUserScreen = ({navigation}) => {
  let [obj, setObj] = useState('');
  let [userData, setUserData] = useState({});


  useEffect(() => {
    userService
      .getUsers()
      .then((res) => {
        let allUsers = res.data;
        setUserData(allUsers);
      })
      .catch((err) =>
        Alert.alert(
          'Error',
          'No Users found!',
          [
            {
              text: 'Ok',
            },
          ],
          {cancelable: false},
        ),
      );
  }, []);

  const updateUserData = async (value) => {
    try {
      const obj = JSON.stringify(value)
      await AsyncStorage.setItem('@user', obj)
    } catch (e) {
    }
  }

  const banUser = (email) =>{
    adminService.banUser(email)
    .then(response => console.log(response))
    .catch(err => console.log(err.response.data));
  }

  //update user data in database
  let unBanUser = (email) => {
    adminService.unBanUser(email)
    .then(response => console.log(response))
    .catch(err => console.log(err.response.data));
  }

  let alertBanUser = (email) =>{  
    Alert.alert('Ban User', 'Are you sure you wish to Ban this user.',[
      {text: 'BAN', onPress: () => banUser(email)},
      {text: 'UnBan', onPress: () => unBanUser(email)},
      {text: 'Cancel', onPress: () => console.log("Cancel")},
    ]);
  
  }

  const Item = ({item, onPress, backgroundColor, textColor}) => (
    <TouchableOpacity onPress={onPress} style={[styles.item, backgroundColor]}>
      <Text style={[styles.userList, textColor]}>
        {' '}
        {item.username} {'\n'} {item.email}{' '}{item.status}
      </Text>
    </TouchableOpacity>
  );

  const [selectedId, setSelectedId] = useState(null);

  const renderItem = ({item}) => {
    const backgroundColor = item.status === "banned" ? '#8B0000' : '#7C9262';
    const color = item.id === selectedId ? 'white' : 'white';

    return (
      <Item
        item={item}
        onPress={() => {setSelectedId(item.id), alertBanUser(item.email)}}
        backgroundColor={{backgroundColor}}
        textColor={{color}}
      />
    );
  };

  return (
    <View style={styles.backgroundContainer}>
      <ImageBackground
        source={require('../assets/images/background/light-wood.jpg')}
        style={styles.image}>
        <View style={styles.container}>
          <View style={styles.searchContainer}>
            <ImageBackground
              source={require('../assets/images/background/dark-wood.jpg')}
              style={styles.image}>
              <View style={styles.searchHeader}>
                <Text style={styles.searchText}>User List</Text>
              </View>
            </ImageBackground>
          </View>
          <View style={styles.scrollContainer}>
            <FlatList
              data={userData}
              renderItem={renderItem}
              keyExtractor={(item) => item.id}
              extraData={selectedId}
            />
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

export default AdminManageUserScreen;
