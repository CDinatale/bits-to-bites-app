import React, {useState, useEffect} from 'react';
import styles from '../styles/AdminStyles';
import uplaodedRecipeService from '../services/UploadedRecipeService';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  ScrollView,
  View,
  Text,
  TextInput,
  Image,
  ImageBackground,
  FlatList,
  TouchableOpacity,
  Alert,
} from 'react-native';

const AdminManageUploadsScreen = ({navigation}) => {
  let [obj, setObj] = useState('');
  let [recipeData, setUploadedRecipeData] = useState({});
  const [user, setUser] = useState({});

  const getUser = async () => {
    try {
      const obj = await AsyncStorage.getItem('@user');
      return JSON.parse(obj);
    } catch (e) {}
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
    getUser().then((data) => setUser(data));
    });
    return unsubscribe;
  }, [navigation]);


  const Item = ({item, onPress, style}) => (
    <TouchableOpacity onPress={onPress} style={[styles.item, style]}>
      <Image source={{uri: item.imageUrl}} style={[styles.recipeImage]} />
    </TouchableOpacity>
  );

  const renderItem = ({item}) => {
    return (
      <Item
        item={item}
        onPress={() => {
          navigation.navigate('AdminStartRecipe', {item, user});
        }}
      />
    );
  };

  useEffect(() => {
    uplaodedRecipeService
      .getRecipes()
      .then((res) => {
        let allRecipes = res.data;
        setUploadedRecipeData(allRecipes);
      })
      .catch(err =>
        Alert.alert(
          'Error',
          'No recipes found!',
          [
            {
              text: 'Ok',
            },
          ],
          {cancelable: false},
        ),
      );
  }, []);

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
                <Text style={styles.searchText}>Uploaded Recipes</Text>
              </View>
            </ImageBackground>
          </View>
          <View style={styles.scrollContainer}>
            <ScrollView>
              <View style={styles.scroll}>
                <Text style={styles.headerText}>UPLOADED RECIPES</Text>
                {
                  <FlatList                
                    horizontal
                    data={recipeData}
                    renderItem={renderItem}
                    keyExtractor={(item, index) => index.toString()}
                  />
                }
              </View>
            </ScrollView>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

export default AdminManageUploadsScreen;
